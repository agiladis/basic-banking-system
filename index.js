const express = require('express');
const router = require('./routes/route');
const app = express();
const { swaggerDocs: V1SwaggerDocs } = require('./helper/swagger');

require('dotenv').config();

const PORT = process.env.PORT;

// to know how body request type
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send('Hello Bank System');
});

app.listen(PORT, () => {
  console.log(`banking system app listening at http://localhost:${PORT}`);
  V1SwaggerDocs(app, PORT);
});
