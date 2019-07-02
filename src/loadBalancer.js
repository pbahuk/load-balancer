const http = require('http');
const httpProxy = require('http-proxy');
const arguments = process.argv.slice(2);


const proxy = httpProxy.createProxyServer({});


const addresses = [
  {
    host: 'localhost',
    port: 8001
  },
  {
    host: 'localhost',
    port: 8002
  },
  {
    host: 'localhost',
    port: 8003
  }
];

let i =0;

console.log('Load Balancer Listening on PORT:', arguments[0]);
http.createServer(function(req, res) {
  const targetServer = {
    target: "http://" + addresses[i].host + ":" + addresses[i].port + "/"
  }
  console.log('Going to the target server:', targetServer.target);
  proxy.web(req, res, targetServer);
  i = (i + 1) % addresses.length;
}).listen(arguments[0]);

