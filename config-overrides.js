const path = require("path")
const webpack = require("webpack")

const {
  override,
  addBabelPlugins,
  babelInclude,
  addWebpackAlias,
  addWebpackPlugin,
  removeModuleScopePlugin,
  addWebpackModuleRule
} = require("customize-cra")



module.exports = {
  paths: (paths, env) => {
    paths.appIndexJs = path.resolve(__dirname, "index.js")
    paths.appSrc = path.resolve(__dirname, "app")
    paths.testsSetup = path.resolve(__dirname, "web/setupTests")
    paths.proxySetup = path.resolve(__dirname, "web/setupProxy.js")
    paths.swSrc = path.resolve(__dirname, "web/service-worker")
    paths.appTypeDeclarations = path.resolve(__dirname, "web/react-app-env.d.ts")
    return paths
  },
  webpack: override(
    ...addBabelPlugins("@babel/plugin-proposal-class-properties", "babel-plugin-react-native-web"),
    babelInclude([
      path.resolve(__dirname, "node_modules/react-native-gesture-handler"),
      path.resolve(__dirname, "node_modules/@react-navigation"),
      path.resolve(__dirname, "node_modules/react-native-screens"),
      path.resolve(__dirname, "node_modules/react-native-web"),
      path.resolve(__dirname, "node_modules/react-native-swipe-gestures"),
      path.resolve(__dirname, "node_modules/expo-localization"),
      path.resolve(__dirname, "app"),
      path.resolve(__dirname, "storybook"),
      path.resolve(__dirname, ""),
    ]),
    addWebpackAlias({
      "react-native": "react-native-web",
      "react-native-web/dist/exports/Modal": "modal-enhanced-react-native-web",
      "reactotron-react-native": "reactotron-react-js",
    }),
    addWebpackPlugin(new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
      __DEV__: process.env.NODE_ENV === "production" || true,
    })),
    removeModuleScopePlugin(),
    addWebpackModuleRule({
      test: /\.(gif|jpe?g|png|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          esModule: false,
        }
      }
    })
  ),
}
