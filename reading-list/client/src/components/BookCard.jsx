import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { getBooksQuery, removeBookMutation } from '../queries';

const RemoveBook = id => (
  <Mutation mutation={removeBookMutation} refetchQueries={[{ query: getBooksQuery }]}>
    {removeBook => (
      <button type="button" onClick={() => removeBook({ variables: { id } })} className="remove">
        X
      </button>
    )}
  </Mutation>
);

function BookCard({ book, handleSelect }) {
  return (
    <div className="card-container">
      <button type="button" onClick={handleSelect} className="card">
        {book.name}
      </button>
      {RemoveBook(book.id)}
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }).isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default BookCard;
