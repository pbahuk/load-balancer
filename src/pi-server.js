const express = require('express');
const app = express();
const arguments = process.argv.slice(2);

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
app.listen(PORT);