module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        files: [
            { pattern: 'tests.js', watched: false }
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'tests.js': ['webpack']
        },
        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel',
                        query: {
                            presets: ['es2015', 'react'],
                            plugins: ['transform-object-rest-spread', 'babel-plugin-rewire', 'transform-object-assign']
                        }
                    }
                ]
            },
            watch: true
        },
        webpackServer: {
            noInfo: true
        }
    });
};