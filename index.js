const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const controllers = require('./controllers');
const middlewares = require('./middlewares');

// não remova esse endpoint, e para o avaliador funcionar
app
  .get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
})
  .get('/talker', controllers.getTalkers )
  .get('/talker/:id', controllers.getTalkerById );

app.listen(PORT, () => {
  console.log('Online');
});
