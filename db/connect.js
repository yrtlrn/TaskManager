const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);

const connect = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected To DB');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connect;
