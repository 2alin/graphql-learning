import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { getBooksQuery } from '../queries';
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  displayBooks() {
    const { data } = this.props;
    if (data.loading) {
      return <div>Loading books...</div>;
    }
    if (data.error) {
      return <div>Can&apos;t connect to API</div>;
    }
    return (
      <div>
        <ul>
          {data.books.map(book => (
            <li key={book.id}>
              {book.name}
              <button
                type="button"
                onClick={() => {
                  this.setState({ selected: book.id });
                  // console.log(`clicked on ${book.id}`);
                }}
              >
                &gt;&gt;
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

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
  data: PropTypes.shape({
    loading: PropTypes.bool,
    books: PropTypes.array,
  }).isRequired,
};

export default graphql(getBooksQuery)(BookList);
