import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
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

    Object.keys(this.state).forEach((key) => {
      formattedState[key] = this.state[key].trim();
    });
    formattedState.genre = formattedState.genre.toLowerCase();

    this.props.addBookMutation({
      variables: {
        ...formattedState,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });

    this.setState({ ...initState });
  };

  displayAuthors() {
    const { getAuthorsQuery: data } = this.props;
    if (data.loading) {
      return <option disabled>Loading authors...</option>;
    }
    return data.authors.map(author => (
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

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' }),
)(AddBook);
