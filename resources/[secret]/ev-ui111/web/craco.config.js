const path = require("path");
const fs = require('fs');
const obfuscator = require('javascript-obfuscator');

class ObfuscatePlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('ObfuscatePlugin', (compilation, callback) => {
      const outputPath = compilation.options.output.path;

      const directory = path.join(outputPath, 'static', 'js');

      const doesDirExist = fs.existsSync(directory);

      if (!doesDirExist) {
        return callback();
      }

      const obfuscatedFilePath = path.join(directory, 'main.chunk.js');

      if (!fs.existsSync(obfuscatedFilePath)) {
        return callback();
      }

      const bundleContent = fs.readFileSync(obfuscatedFilePath, 'utf8');

      const obfuscatedCode = obfuscator.obfuscate(bundleContent, this.options).getObfuscatedCode();

      try {
        fs.writeFileSync(obfuscatedFilePath, obfuscatedCode, 'utf8');
        console.log('Obfuscation completed successfully.');

        const files = fs.readdirSync(directory);
        for (const file of files) {
          if (file.endsWith('.txt')) {
            fs.unlinkSync(path.join(directory, file));
          }
        }

        console.log('Removed license files.');

        return callback();
      } catch (err) {
        console.error('Error writing the obfuscated code to the output file:', err);
        return callback(err);
      }
    });
  }
}

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Because CEF has issues with loading source maps properly atm,
      // lets use the best we can get in line with `eval-source-map`
      if (webpackConfig.mode === 'development' && process.env.IN_GAME_DEV) {
        webpackConfig.devtool = 'eval-source-map'
        webpackConfig.output.path = path.join(__dirname, 'build')
      }

      webpackConfig.output.filename = 'static/js/[name].js';
      webpackConfig.output.chunkFilename = 'static/js/[name].chunk.js';

      webpackConfig.optimization.splitChunks = {
        chunks: 'all',
        name: true
      }

      return webpackConfig
    },
    plugins: [
      new ObfuscatePlugin({
        compact: true,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 5,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayCallsTransformThreshold: 0.5,
        stringArrayEncoding: ['rc4'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 3,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 0.75,
        transformObjectKeys: false,
        unicodeEscapeSequence: false
      })
    ]
  },

  devServer: (devServerConfig) => {
    if (process.env.IN_GAME_DEV) {
      // Used for in-game dev mode
      devServerConfig.writeToDisk = true
    }

    return devServerConfig
  }
}