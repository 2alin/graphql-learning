const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

const books = [
  { name: 'The Lord of The Rings', genre: 'Fantasy', id: '1' },
  { name: 'Harry Potter', genre: 'Fantasy', id: '2' },
  { name: 'How To Cook Rice', genre: 'Kitchen', id: '3' },
];

const authors = [
  { name: 'J. R. R. Tolkien', age: 81, id: '1' },
  { name: 'J. K. Rowling', age: 53, id: '2' },
  { name: 'Mr. Cheff', age: 48, id: '3' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return books.find(book => book.id === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.find(author => author.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
