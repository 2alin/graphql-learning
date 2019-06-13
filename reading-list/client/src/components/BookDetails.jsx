import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { getBookQuery } from '../queries';

class BookDetails extends Component {
  displayBookDetails() {
    const {
      data: { book },
    } = this.props;

    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this autor:</p>
          <ul className="other-books">
            {book.author.books.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      );
    }
    return <div>No book selected...</div>;
  }

  render() {
    return <div id="book-details">{this.displayBookDetails()}</div>;
  }
}

BookDetails.propTypes = {
  data: PropTypes.shape({ data: { book: PropTypes.object } }).isRequired,
};

export default graphql(getBookQuery, {
  options: props => ({
    variables: {
      id: props.bookId,
    },
  }),
})(BookDetails);
