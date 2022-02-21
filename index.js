const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const controllers = require('./controllers');
const middlewares = require('./middlewares');

const validationsLogin = [
  middlewares.validatePassword,
  middlewares.validateEmail,
];

const validationTalker = [
  middlewares.validateToken,
  middlewares.validateAge,
  middlewares.validateName,
  middlewares.validateTalk,
];

app.post('/login', validationsLogin, controllers.newlogin);
app.post('/talker', validationTalker, controllers.createTalker);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', controllers.getTalkers);
app.get('/talker/search', [middlewares.validateToken], controllers.searchTalker);
app.get('/talker/:id', controllers.getTalkerById);

app.put('/talker/:id', validationTalker, controllers.editTalker);

app.delete('/talker/:id', [middlewares.validateToken], controllers.deleteTalker);

app.use(middlewares.errorHandler);
app.listen(PORT, () => {
  console.log('Online');
});
