const { getDefaultConfig } = require("@react-native/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // remove ALL web extensions
  config.resolver.sourceExts = [
    "tsx",
    "ts",
    "jsx",
    "js",
    "json"
  ];

  // also block web-specific files
  config.resolver.assetExts = config.resolver.assetExts.filter(
    ext => !ext.includes("web")
  );

  return config;
})();
