const express = require('express');
const path = require('path');
require('colors');

const errorHandler = require('./middleware/errorHandler');

const connectDB = require('./config/db');

const configPath = path.join(__dirname, '..', 'backend', 'config', '.env');
require('dotenv').config({ path: configPath });

const app = express();

// JSON body parser
app.use(express.json());
// Forms parser
app.use(express.urlencoded({ extended: false }));

// Mounts routes
// app.use('/api/v1/devices', require('./routes/devicesRoutes'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`.cyan.bold.italic);
});
