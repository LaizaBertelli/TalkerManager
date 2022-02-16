const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Requisito 1 - endpoint GET /talker
async function getAllTalkers(req, res) {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  res.status(200).send(JSON.parse(talkers));
}

// não remova esse endpoint, e para o avaliador funcionar
app
  .get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
})
  .get('/talker', (req, res) => getAllTalkers(req, res));

app.listen(PORT, () => {
  console.log('Online');
});
