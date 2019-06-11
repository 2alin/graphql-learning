import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    };
  }

  displayAuthors() {
    const { getAuthorsQuery: data } = this.props;
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        ...this.state,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  render() {
    return (
      <form id="add-book" onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="name">Book name:</label>
          <input
            type="text"
            id="name"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
        </div>
        <div className="field">
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            onChange={e => this.setState({ genre: e.target.value })}
            value={this.state.genre}
          />
        </div>
        <div className="field">
          <label htmlFor="author">Author:</label>
          <select
            id="author"
            onChange={e => this.setState({ authorId: e.target.value })}
            value={this.state.authorId}
          >
            <option value="">Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
