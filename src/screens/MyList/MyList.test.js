import { render } from '@testing-library/react-native';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from '@/networking/clients/movieDBClient';
import { withProviders } from '@/test-utils';
import { movieResponse } from '@/test-utils/mocks';
import MyList from '@/screens/MyList/MyList';

const mockedParams = { movieId: movieResponse.id };

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => ({
      params: mockedParams,
    }),
  };
});

const fakeStore = {
  error: {},
  status: {},
  user: {
    username: 'johndoe',
  },
  myMovies: {
    myMovies: [
      {
        id: 663712,
        title: 'The Terrifier 2 - Movie (Original)',
        image: '/y5Z0WesTjvn59jP6yo459eUsbli.jpg',
      },
      {
        id: 820067,
        title: 'The Quintessential Quintuplets Movie',
        image: '/jBIMZ0AlUYuFNsKbd4L6FojWMoy.jpg',
      },
    ],
  },
};

describe('MyList', () => {
  let axiosMock;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
    axiosMock.onGet(`/movie/${movieResponse.id}`).reply(200, movieResponse);
  });

  afterEach(() => {
    axiosMock.restore();
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(withProviders(<MyList />, { initialState: fakeStore }));
    expect(toJSON()).toMatchSnapshot();
  });
});
