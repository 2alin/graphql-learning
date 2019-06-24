import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import BookDetails from '../components/BookDetails';
import { getBookQuery } from '../queries';

const mocks = [
  {
    request: {
      query: getBookQuery,
      variables: {
        id: '1',
      },
    },
    result: {
      data: {
        book: {
          id: '1',
          name: 'My Little Book',
          genre: 'scifi',
          author: {
            age: 30,
            id: '2',
            name: 'Me',
            books: [{ id: '1', name: 'My Little Book' }],
          },
        },
      },
    },
  },
];

const component = renderer.create(
  <MockedProvider mocks={mocks} addTypename={false}>
    <BookDetails bookId="1" />
  </MockedProvider>,
);

it('component renders correctly', () => {
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('indicates when book is not selected', () => {
  const tree = renderer
    .create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookDetails />
      </MockedProvider>,
    )
    .toJSON();

  expect(tree.children).toContain('No book selected...');
});

it('renders correct book information', async () => {
  await wait(0);

  const h2 = component.root.findByType('h2');
  const pList = component.root.findAllByType('p');
  const itemList = component.root.findByType('li');

  expect(h2.children).toContain('My Little Book');
  expect(pList[0].children).toContain('scifi');
  expect(pList[1].children).toContain('Me');
  expect(itemList.children).toContain('My Little Book');
});
