const path = require('path')
const WebpackObfuscator = require('webpack-obfuscator');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const buildPath = path.join(__dirname, '../server');

const server = () => ({
    entry: ['./src/server/server.ts'],
    output: {
        path: path.resolve(buildPath),
        filename: 'sv_main.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        /* new WebpackObfuscator({
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
            stringArrayCallsTransformThreshold: 1,
            stringArrayEncoding: ['rc4'],
            stringArrayIndexShift: true,
            stringArrayRotate: true,
            stringArrayShuffle: true,
            stringArrayWrappersCount: 15,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersParametersMaxCount: 15,
            stringArrayWrappersType: 'function',
            stringArrayThreshold: 1,
            transformObjectKeys: true,
            unicodeEscapeSequence: false
        }) */
    ],
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({
            configFile: path.resolve(__dirname, 'src/server/tsconfig.json')
        })]
    }
});

module.exports = [server];