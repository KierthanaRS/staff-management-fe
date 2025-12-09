import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-config", () => ({
  REACT_NATIVE_BACKEND_URL: "http://localhost:3000",
}));
jest.spyOn(global.console, "warn").mockImplementation(() => {});
jest.spyOn(global.console, "error").mockImplementation(() => {});
