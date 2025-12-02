const path = require("path");

module.exports = {
  mode: "development",
  entry: "./index.web.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".web.js", ".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "react-native$": "react-native-web",
      "@react-navigation/native": path.resolve(
        __dirname,
        "src/navigation/NavigationWebMock.web.tsx"
      ),
      "react-native-config": path.resolve(
        __dirname,
        "src/config/reactNativeConfigWeb.web.ts"
      ),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.resolve(__dirname),
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript"
            ]
          },
        },
      },
    ],
  },

  devServer: {
    static: path.join(__dirname, "public"),
    port: 8080,
  },
};
