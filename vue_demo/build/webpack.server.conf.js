const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var fs = require('fs');
var devConfig = require('../config');
var proxyTable = devConfig.dev.proxyTable;

var envConf = {
    httpPort: "8099",
    _httpsPort: "8443",
    proxyTable: proxyTable
};

var createEnvFile = () => {
    fs.open('./dist/env.json', 'w', function(err, fd) {
        const buf = JSON.stringify(envConf, null, 2);
        fs.write(fd, buf, 0, buf.length, 0, function (_err, written, buffer) {});
    });
}
fs.exists("./dist", (exist) => {
    if (exist) {
        createEnvFile();
    } else {
        fs.mkdir("./dist", (e) => {
            if (e) {
                console.error(e);
            } else {
                createEnvFile();
            }
        })
    }
});

module.exports = {
    entry: {
        server: './build/server'
    },
    target: "node",
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js'
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './build/secure', to: '../dist/secure' }
        ])
    ]
};
