// module.exports = {
//   presets: [
//     "module:@react-native/babel-preset",
//     // "@babel/preset-react",
//     "@babel/preset-typescript"
//   ]
// };
// // // module.exports = {
// // //   presets: ["module:@react-native/babel-preset"],
// // // };

module.exports = {
  presets: ["module:@react-native/babel-preset", "@babel/preset-typescript"],
  plugins: [
    ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
    ["@babel/plugin-transform-react-jsx-self", false],
    ["@babel/plugin-transform-react-jsx-source", false]
  ]
};
