import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import BookCard from '../components/BookCard';
import { getBooksQuery, removeBookMutation } from '../queries';

const mocks = [
  {
    request: {
      query: getBooksQuery,
    },
    result: {
      data: { books: [] },
    },
  },
  {
    request: {
      query: removeBookMutation,
      variables: { id: '123' },
    },
    result: {
      data: {
        removeBook: { name: 'My Little Book', id: '123' },
      },
    },
  },
];

const book = {
  name: 'The Little Book',
  id: '123',
};
const handleSelect = id => id;

const component = renderer.create(
  <MockedProvider mocks={mocks} addTypename={false}>
    <BookCard {...{ book, handleSelect }} />
  </MockedProvider>,
);

it('component renders correctly', () => {
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

describe('describe `card`', () => {
  it('renders correctly', () => {
    const card = component.root.findByProps({ className: 'card' });
    expect(card).toBeTruthy();
  });

  it('renders book name', () => {
    const card = component.root.findByProps({ className: 'card' });
    expect(card.children).toContain(book.name);
  });

  it('onClick triggers an event with `id` as argument', () => {
    const card = component.root.findByProps({ className: 'card' });
    expect(card.props.onClick()).toBe(book.id);
  });
});

describe('describe `remove` button', () => {
  it('renders correctly', () => {
    const removeButton = component.root.findByProps({ className: 'remove' });
    expect(removeButton).toBeTruthy();
  });

  it('onClick resolves `removeBookMutation`', async () => {
    const removeButton = component.root.findByProps({ className: 'remove' });
    const res = removeButton.props.onClick();
    await expect(res).resolves.toEqual({
      data: {
        removeBook: {
          name: 'My Little Book',
          id: '123',
        },
      },
    });
  });
});
