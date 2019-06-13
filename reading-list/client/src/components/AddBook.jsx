import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries';

const initState = {
  name: '',
  genre: '',
  authorId: '',
};

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initState };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const formattedState = {};
    const { addBook } = this.props;

    Object.keys(this.state).forEach((key) => {
      const { [key]: value } = this.state;
      formattedState[key] = value.trim();
    });
    formattedState.genre = formattedState.genre.toLowerCase();

    addBook({
      variables: {
        ...formattedState,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });

    this.setState({ ...initState });
  };

  displayAuthors() {
    const { getAuthors } = this.props;
    if (getAuthors.loading) {
      return <option disabled>Loading authors...</option>;
    }
    if (getAuthors.error) {
      return <option disabled>Can&apos;t connect to API</option>;
    }
    return getAuthors.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  }

  render() {
    const { name, genre, authorId } = this.state;
    return (
      <form id="add-book" onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="name">
            Book name:
            <input
              type="text"
              id="name"
              onChange={e => this.setState({ name: e.target.value })}
              value={name}
            />
          </label>
        </div>
        <div className="field">
          <label htmlFor="genre">
            Genre:
            <input
              type="text"
              id="genre"
              onChange={e => this.setState({ genre: e.target.value })}
              value={genre}
            />
          </label>
        </div>
        <div className="field">
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label htmlFor="author">
            Author:
            <select
              id="author"
              onChange={e => this.setState({ authorId: e.target.value })}
              value={authorId}
            >
              <option value="">Select author</option>
              {this.displayAuthors()}
            </select>
          </label>
        </div>

        <button type="submit">+</button>
      </form>
    );
  }
}

AddBook.propTypes = {
  getAuthors: PropTypes.shape({ loading: PropTypes.bool, authors: PropTypes.array }).isRequired,
  addBook: PropTypes.func.isRequired,
};

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthors' }),
  graphql(addBookMutation, { name: 'addBook' }),
)(AddBook);
