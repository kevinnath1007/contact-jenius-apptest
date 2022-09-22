import React from 'react';
import {Provider} from 'react-redux';
import ContactList from '../ContactList';
import {
  // fireEvent,
  render,
} from '@testing-library/react-native';
import {store} from '../../../../reducers';

describe('ContactList', () => {
  const navigationMock = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
  };

  const Component = () =>
    render(
      <Provider store={store}>
        {/*@ts-ignore*/}
        <ContactList navigation={navigationMock} route={{}} />
      </Provider>,
    );

  test('snapshot: component match', () => {
    const {toJSON} = Component();

    expect(toJSON()).toMatchSnapshot();
  });

  // test('function: component match', () => {
  //   const {getByTestId} = Component();
  //
  //   fireEvent.press(getByTestId(''));
  //   expect(navigationMock.navigate).toBeCalled();
  //   expect(navigationMock.navigate).toBeCalledTimes(1);
  // });
});
