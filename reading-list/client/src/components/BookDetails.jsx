import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { getBookQuery } from '../queries';

const Book = id => (
  <Query query={getBookQuery} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error! ${error}`;

      const { book } = data;

      return (
        <>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this autor:</p>
          <ul className="other-books">
            {book.author.books.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </>
      );
    }}
  </Query>
);

function BookDetails({ bookId }) {
  return <div id="book-details">{bookId ? Book(bookId) : 'No book selected...'}</div>;
}

BookDetails.propTypes = {
  bookId: PropTypes.string,
};

BookDetails.defaultProps = {
  bookId: null,
};

export default BookDetails;
