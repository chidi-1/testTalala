const path = require('path');
const fs = require('fs')
const PugPlugin = require('pug-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
}

const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES__LIST = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));
const PAGES = PAGES__LIST.reduce((result, item) => {
    result[item.replace(/\.pug/, '')] = `./pug/pages/${item}`
    return result
}, {index: './pug/pagesList.pug'})

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, PATHS.src),
    entry: PAGES,
    output: {
        path: path.resolve(__dirname, PATHS.dist)
    },
    plugins: [
        new PugPlugin({
            pretty: true
        }),

    ],
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: ['css-loader', 'sass-loader']
            },
            {
                test: /\.pug$/,
                loader: PugPlugin.loader
            },
            {
                test: /\.(png|jpg|gif|svg|webp)$/,
                type: 'asset/resource'
            },
        ]
    },
    devServer: {
        port: 3000,
        watchFiles: {
            paths: ['src/pug/*.*', 'assets/scss/**/*.*'],
            options: {
                usePolling: true
            }
        }
    },
    stats: 'errors-only'
}
