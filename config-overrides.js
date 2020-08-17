const {
  addDecoratorsLegacy,
  fixBabelImports,
  addBabelPlugin,
  disableEsLint,
  override,
} = require("customize-cra");

module.exports = {
  webpack: override(
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: "css",
    }),
    addBabelPlugin([
      "babel-plugin-styled-components",
      {
        displayName: true,
        // any extra config from babel-plugin-styled-components
      },
    ]),
    disableEsLint(),
    addDecoratorsLegacy()
  ),
};
