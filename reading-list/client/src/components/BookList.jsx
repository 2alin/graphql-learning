import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getBooksQuery } from '../queries';
import BookDetails from './BookDetails';
import BookCard from './BookCard';

const List = handleSelect => (
  <Query query={getBooksQuery}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading books...</div>;
      if (error) return <div>Can&apos;t connect to API</div>;

      const { books } = data;

      return (
        <ul id="book-list">
          {books.map(book => (
            <li key={book.id}>
              <BookCard {...{ book }} handleSelect={() => handleSelect(book.id)} />
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  handleSelect = (id) => {
    this.setState({ selected: id });
  };

  render() {
    const { selected } = this.state;

    return (
      <div>
        {List(this.handleSelect)}
        <BookDetails bookId={selected} />
      </div>
    );
  }
}

export default BookList;
