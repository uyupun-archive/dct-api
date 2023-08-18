const express = require('express');
const db = require('./models/index');
const _ = require('lodash');

const app = express()
const port = 3000

app.get('/question', async (_req, res) => {
  const questions = await db.Question.findAll();
  res.send(_.sample(questions));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});