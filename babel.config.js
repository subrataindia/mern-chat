module.exports = function (api) {
  api.cache(true);

  const presets = [
    "babel-preset-expo",
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
    "module:metro-react-native-babel-preset",
  ];
  const plugins = [
    ["@babel/plugin-transform-private-methods", { loose: true }], // Set to true or false as needed
    ["@babel/plugin-transform-class-properties", { loose: true }], // Set to true or false as needed
    ["@babel/plugin-transform-private-property-in-object", { loose: true }], // Set to true or false as needed
    ["@babel/plugin-transform-modules-commonjs", { loose: true }],
  ];

  return {
    presets,
    plugins,
  };
};
