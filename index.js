const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT;

// to know how body request type
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello Bank System');
});

// 500 error handling
app.use((err, req, res, next) => {
  res.status(500).json({
    status: false,
    message: 'Internal Server Error',
    data: err,
  });
});

// 404 err handling
app.use((req, res, next) => {
  res.status(400).json({
    status: false,
    message: 'data not fund',
    data: null,
  });
});

app.listen(port, () => {
  console.log(`banking system app listening at http://localhost:${port}`);
});
