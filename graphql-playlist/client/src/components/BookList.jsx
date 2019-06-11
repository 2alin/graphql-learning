import React, { Component } from 'react';

export default class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  render() {
    const { books } = this.state;
    return (
      <div>
        <ul id="book-list">
          {books && books.map(book => 
          <li>{book.name}
          </li>)}
        </ul>
      </div>
    );
  }
}
