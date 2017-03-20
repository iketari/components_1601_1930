module.exports = {
    entry: "./components/app/app.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            { test: /\.pug$/, loader: "pug" }
        ]
    }
};
