const http = require('http');
const httpProxy = require('http-proxy');
const arguments = process.argv.slice(2);
const proxy = httpProxy.createProxyServer({});

/**
 * seaport
 */
const seaport = require('seaport');
const ports = seaport.connect('localhost', 9090);


console.log('Load Balancer Listening on PORT:', arguments[0]);

let i =0;
http.createServer(function(req, res) {
  const addresses = ports.query('pi-server');

  if (!addresses.length) {
    res.end(`No instances running: Please start the seaport
      1. > npm install seaport -g
      2. > seaport listen 9090`);
  } else{
    const targetServer = {
      target: "http://" + addresses[i].host.slice(7) + ":" + addresses[i].port + "/"
    }
    console.log('Going to the target server:', targetServer.target);
    proxy.web(req, res, targetServer);
    i = (i + 1) % addresses.length;
  }
}).listen(arguments[0]);

