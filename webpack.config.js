const path = require('path');
const fs = require('fs-extra');

const toEntries = files =>
  files
    .filter(filename => filename.endsWith('.js'))
    .reduce(
      (acc, filename) => ({
        ...acc,
        [filename.slice(0, -3)]: path.resolve(
          __dirname,
          'lib/yargs-modules',
          filename
        )
      }),
      {}
    );

module.exports = {
  mode: 'development',
  target: 'node',
  entry: async () => {
    const yargsFiles = await fs.readdir(
      path.resolve(__dirname, 'lib/yargs-modules')
    );
    return {
      node: path.resolve(__dirname, 'lib/node/index.js'),
      ...toEntries(yargsFiles)
    };
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  }
};
