const express = require('express');
const app = express();
/**
 * first install seaport on the machine.
 * > npm install seaport -g
 * > seaport listen 9090
 * Listening on the 9090 port on the machine.
 */
const seaport = require('seaport');
const ports = seaport.connect('localhost', 9090);

/**
 * Calculation of PI. Heavy task.
 */
function estimatePi() {
  let n= 1000000, inside =0, x, y;
  for(i =0; i< n; i++) {
    x = Math.random();
    y = Math.random();
    if (Math.sqrt(x * x + y * y) <= 1) {
      inside ++;
    }
  }
  return 4 * inside / n;
}

app.use('*', (req, res) => {
  res.status(200).send({
    PI: estimatePi().toString()
  });
})


const PORT = arguments[0];
console.log('App listening on PORT:', PORT);
app.listen(ports.register('pi-server'));