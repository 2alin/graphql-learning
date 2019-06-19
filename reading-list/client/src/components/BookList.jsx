import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { getBooksQuery, removeBookMutation } from '../queries';
import BookDetails from './BookDetails';
import BookCard from './BookCard';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  displayBooks = () => {
    const { getBooks } = this.props;
    if (getBooks.loading) {
      return <div>Loading books...</div>;
    }
    if (getBooks.error) {
      return <div>Can&apos;t connect to API</div>;
    }
    return (
      <div>
        <ul id="book-list">
          {getBooks.books.map(book => (
            <li key={book.id}>
              <BookCard
                {...{ book }}
                handleSelect={() => {
                  this.setState({ selected: book.id });
                }}
                handleRemove={this.handleRemove}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  handleRemove = (id) => {
    const { removeBook } = this.props;

    removeBook({ variables: { id }, refetchQueries: [{ query: getBooksQuery }] });
  };

  render() {
    const { selected } = this.state;

    return (
      <div>
        {this.displayBooks()}
        <BookDetails bookId={selected} />
      </div>
    );
  }
}

BookList.propTypes = {
  getBooks: PropTypes.shape({
    loading: PropTypes.bool,
    books: PropTypes.array,
  }).isRequired,
  removeBook: PropTypes.func.isRequired,
};

export default compose(
  graphql(getBooksQuery, { name: 'getBooks' }),
  graphql(removeBookMutation, { name: 'removeBook' }),
)(BookList);
