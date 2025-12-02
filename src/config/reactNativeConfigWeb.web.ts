// Web-only stub for `react-native-config`.
// This lets shared code `import Config from 'react-native-config'`
// without bundling the native library in the browser.

const Config = {
  // Change this or override at build time if needed.
  REACT_NATIVE_BACKEND_URL: "http://localhost:3000/api/v1",
};

export default Config;


