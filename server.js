const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const morgan = require('morgan');

const keys = require('./config/keys');
const itemsRoute = require('./routes/api/itemsRoute');
const usersRoute = require('./routes/api/usersRoute');
const authRoute = require('./routes/api/auth');

const app = express();

// Connect to Mongodb
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => console.log(err));

//BodyParser Middleware
app.use(express.json());

//Morgan Middleware to get the routes
// app.use(morgan('combined'));

// User Routes
app.use('/api/items', itemsRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

//Serve static assests if in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3090;

app.listen(port, () => console.log(`Server started on port ${port}`));
