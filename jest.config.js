const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  setupFiles: ['./jest.globals.js'],
  automock: false,
  clearMocks: true,
  transform: {
    ...tsjPreset.transform,
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@react-native|react-native|@react-navigation|@react-native-firebase/remote-config|@sicepat/glimmer-cape-adapter-firebase-rn|@sicepat/glimmer-cape-core|@sicepat/glimmer-cape-react|react-native-background-actions|react-native-copilot|react-native-skeleton-placeholder|react-native-maps|recoil|react-native-reanimated|react-native-background-timer|react-native-linear-gradient|react-native-device-info|jail-monkey|tiny-emitter|@twotalltotems/react-native-otp-input|@sentry/react-native|react-native-webview|@react-native-masked-view)/)',
  ],
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/__tests__/*.{ts,tsx}'],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '!**/node_modules/**',
    '!./coverage/**',
    '!<rootDir>/*',
    '!**/__snapshots__/**',
  ],
  maxWorkers: 1,
  coverageThreshold: {
    global: {
      lines: 10,
      statements: 10,
    },
  },
};
