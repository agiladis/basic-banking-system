const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello Bank System');
});

app.listen(port, () => {
  console.log(`banking system app listening at http://localhost:${port}`);
});
