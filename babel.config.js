module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  plugins.push('react-native-worklets/plugin');
  plugins.push([
    'module-resolver',
    {
      root: ['.'],
      alias: { '@': '.' },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
  ]);

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
