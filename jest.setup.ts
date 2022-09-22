/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import '@testing-library/jest-native/extend-expect';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

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
