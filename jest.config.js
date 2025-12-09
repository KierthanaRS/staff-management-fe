module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
      "|@react-native" +
      "|react-native-config" +
      "|@react-native-async-storage" +
      "|immer" +
      "|@reduxjs/toolkit" +
      ")/)",
  ],
  moduleNameMapper: {
    "\\.(png|jpg|jpeg|gif)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFiles: ["<rootDir>/jestSetup.js"],
};
