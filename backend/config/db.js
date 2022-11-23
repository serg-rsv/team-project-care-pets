const { connect } = require('mongoose');

const connectDB = async () => {
  try {
    const db = await connect(process.env.CONNECT_DB_URI);
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDB;
