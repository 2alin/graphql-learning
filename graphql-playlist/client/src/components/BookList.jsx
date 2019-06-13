import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { getBooksQuery } from '../queries';

class BookList extends Component {
  displayBooks() {
    const { data } = this.props;
    if (data.loading) {
      return <div>Loading books...</div>;
    }
    if (data.error) {
      return <div>Can&apos;t connect to API</div>;
    }
    return (
      <ul>
        {data.books.map(book => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    );
  }

  render() {
    return <div>{this.displayBooks()}</div>;
  }
}

BookList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    books: PropTypes.array,
  }).isRequired,
};

export default graphql(getBooksQuery)(BookList);
