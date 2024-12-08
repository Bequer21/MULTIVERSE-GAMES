const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Backend en funcionamiento');
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
