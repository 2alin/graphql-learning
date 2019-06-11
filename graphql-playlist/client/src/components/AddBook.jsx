import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries';

class AddBook extends Component {
  displayAuthors() {
    const { data } = this.props;
    if (data.loading) {
      return <option disabled>Loading authors...</option>;
    } else {
      return data.authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  }
  render() {
    console.log(this.props);
    return (
      <form id="add-book">
        <div className="field">
          <label htmlFor="book-name">Book name:</label>
          <input type="text" id="book-name" />
        </div>
        <div className="field">
          <label htmlFor="genre">Genre:</label>
          <input type="text" id="genre" />
        </div>
        <div className="field">
          <label htmlFor="author">Author</label>
          <select id="author">
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
