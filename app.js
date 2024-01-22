const express = require('express');
const app = express();
const router = require('./routes/tasks');
const connect = require('./db/connect');
// Middleware
app.use(express.static('public'));
app.use(express.json());

app.use('/api/v1/', router);

const start = async () => {
  try {
    await connect();
    app.listen(3000, () => console.log(`Listening to port: 3000...`));
  } catch (error) {
    console.log(error.message);
  }
};

start();
