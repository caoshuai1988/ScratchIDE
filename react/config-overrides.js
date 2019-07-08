const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
  disableEsLint(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  ...addBabelPresets(
    [
      "@babel/env",
      {
        targets: {
          browsers: ["> 1%", "last 2 versions"]
        },
        modules: "commonjs"
      }
    ],
    "@babel/preset-flow",
    "@babel/preset-react"
  ),
  babelInclude([
    path.resolve("src"), // make sure you link your own source
    path.resolve("node_modules/native-base-shoutem-theme"),
    path.resolve("node_modules/react-navigation"),
    path.resolve("node_modules/react-native-easy-grid")
  ])
);