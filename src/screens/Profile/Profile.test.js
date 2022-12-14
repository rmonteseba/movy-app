import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import * as UserReducer from '@/reducers/UserReducer';
import { strings } from '@/localization';
import { mockLogoutNetworkService } from '@/mocks';
import Profile from '@/screens/Profile/Profile';
import { withProviders } from '@/test-utils';

describe('Profile', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(
      withProviders(<Profile />, { networkService: mockLogoutNetworkService })
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render the title and logout button', () => {
    const { getByText } = render(
      withProviders(<Profile />, { networkService: mockLogoutNetworkService })
    );

    const logoutButton = getByText(strings.profile.logout);

    expect(logoutButton).toBeTruthy();
  });

  it('should logout the user', () => {
    const logoutSpy = jest.spyOn(UserReducer, 'logout');

    const { getByText } = render(
      withProviders(<Profile />, { networkService: mockLogoutNetworkService })
    );

    const logoutButton = getByText(strings.profile.logout);

    fireEvent.press(logoutButton);

    expect(logoutSpy).toHaveBeenCalledTimes(1);

    logoutSpy.mockRestore();
  });
});
