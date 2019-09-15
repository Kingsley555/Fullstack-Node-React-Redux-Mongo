const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
// const morgan = require('morgan');

const { mongoURI } = require('./config/keys');
const itemsRoute = require('./routes/api/itemsRoute');

const app = express();

// Connect to Mongodb
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => console.log(err));

//BodyParser Middleware
app.use(bodyParser.json());

//Morgan Middleware to get the routes
// app.use(morgan('combined'));

// User Routes
app.use('/api/items', itemsRoute);

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
