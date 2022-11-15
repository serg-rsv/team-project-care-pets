const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

require('colors');

const { errorHandler } = require('./middleware');

const connectDB = require('./config/db');

const configPath = path.join(__dirname, 'config', '.env');
require('dotenv').config({ path: configPath });

const {
  usersRoutes,
  noticesRoutes,
  petsRoutes,
  newsRoutes,
  friendsRoutes,
} = require('./routes/api');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));

app.use(cors());

// JSON body parser
app.use(express.json());
// Forms parser
app.use(express.urlencoded({ extended: false }));

// Mounts routes
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/notices', noticesRoutes);
app.use('/api/v1/pets', petsRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/services-sidebar', friendsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`.cyan.bold.italic);
});
