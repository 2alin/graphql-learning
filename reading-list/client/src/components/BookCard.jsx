import React from 'react';
import PropTypes from 'prop-types';

function BookCard({ book, handleSelect, handleRemove }) {
  return (
    <div className="card-container">
      <button type="button" onClick={handleSelect} className="card">
        {book.name}
      </button>
      <button type="button" onClick={() => handleRemove(book.id)} className="remove">
        X
      </button>
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }).isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default BookCard;
