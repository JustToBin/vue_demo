import express from 'express';
import proxy from 'http-proxy-middleware';
import fs from 'fs';
import http from 'http';
import https from 'https';

var server = {
  apiContext: "waybillpeer"
};

var fromApp = express();
var app = express();

var httpServer = null;
var httpsServer = null;

fs.readFile("./env.json", { encoding: 'utf-8' }, function (err, bytesRead) {
  if (err) {
    throw err;
  }
  let config = JSON.parse(bytesRead);

  let serverCustConfig = {
    absolutePath: process.cwd(),
    httpPort: config.httpPort,
    httpsPort: config.httpsPort
  };
  let proxyTable = config.proxyTable;

  let PORT = serverCustConfig.httpPort;
  let SSLPORT = serverCustConfig.httpsPort;

  app.get('/', function(req, res) {
    res.sendFile(serverCustConfig.absolutePath + "/index.html");
  });
  app.get('/favicon.ico', function(req, res) {
    res.sendFile(serverCustConfig.absolutePath + "/static/favicon.ico");
  });
  app.use('/static', express.static(serverCustConfig.absolutePath + "/static"));

  for (const key in proxyTable) {
    app.use(key, proxy(proxyTable[key]));
  }
  
  if (SSLPORT) {
    var privateKey = fs.readFileSync('./secure/server.key', 'utf8');
    var certificate = fs.readFileSync('./secure/server.crt', 'utf8');
    var credentials = { key: privateKey, cert: certificate };

    fromApp.get('/*', function(req, res) {
      res.redirect(307, `https://${req.hostname}:${SSLPORT}${req.url}`);
    });

    httpServer = http.createServer(fromApp);
    httpsServer = https.createServer(credentials, app);
    httpsServer.listen(SSLPORT, function() {
      console.log('HTTPS 服务启动，端口为：%s', SSLPORT);
    });
  } else {
    httpServer = http.createServer(app);
  }

  httpServer.listen(PORT, function() {
    console.log('HTTP 服务启动，端口为：%s', PORT);
  });

});
