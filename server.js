const express = require('express');
const db = require('./config/connection');
const { Dictionary } = require('./models');
const { dictionaries , references } = require('./utils/constants')


const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get( '/dictionaries', (req, res) => {

  res.status(200).json(dictionaries)

})

app.get( '/references', (req, res) => {

  res.status(200).send(references)

})



db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});