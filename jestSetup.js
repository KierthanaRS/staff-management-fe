import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-config", () => ({
  REACT_NATIVE_BACKEND_URL: "http://localhost:3000",
}));

jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('react');
  const Mock = (props) => null;
  return Mock;
});

jest.spyOn(global.console, "warn").mockImplementation(() => {});
jest.spyOn(global.console, "error").mockImplementation(() => {});
