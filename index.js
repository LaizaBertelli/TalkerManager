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

// Requisito 2 - endpoint GET /talker/:id
async function getTalkerById(req, res) {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  const filteredTalkers = talkers.find((talker) => talker.id === Number(id));
  if (filteredTalkers) {
    res.status(200).send(filteredTalkers);
  } else {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
}

// não remova esse endpoint, e para o avaliador funcionar
app
  .get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
})
  .get('/talker', (req, res) => getAllTalkers(req, res))
  .get('/talker/:id', (req, res) => getTalkerById(req, res));

app.listen(PORT, () => {
  console.log('Online');
});
