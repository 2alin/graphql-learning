import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      books: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data.loading !== prevProps.data.loading) {
      this.setState({
        loading: data.loading,
        books: data.books ? data.books : [],
      });
    }
  }

  render() {
    const { books, loading } = this.state;

    return (
      <div>
        {!loading ? (
          <ul id="book-list">
            {books && books.map(book => <li key={book.id}>{book.name}</li>)}
          </ul>
        ) : (
          <div>Loading books...</div>
        )}
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
