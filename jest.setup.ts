/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import '@testing-library/jest-native/extend-expect';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      setOptions: jest.fn(),
      goBack: () => {},
      addListener: () => {},
    }),
    createNavigatorFactory: jest.fn(),
    useIsFocused: () => {},
  };
});
