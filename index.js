import express from'express';

import { getQuestion, createAnswer, cunningAnswer } from './src/useCases/index.js';

const app = express()
const port = 3000
app.use(express.json());

app.get('/question', async (_, res) => {
  const response = await getQuestion()
  res.status(response.status).send(response.body);
});

app.post('/answer', async (req, res) => {
  const response = await createAnswer(req.body);
  res.status(response.status).send();
});

app.post('/cunning', async(req, res) => {
  const response = await cunningAnswer(req.body);
  res.status(response.status).send(response.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});