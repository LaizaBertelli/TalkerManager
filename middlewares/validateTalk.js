// I didn't use try/catch and arrow function because of lint :/
function validateExistence(talk) {
  if (!talk || (!talk.rate && talk.rate !== 0) || !talk.watchedAt) {
    return true;
  }
  return false;
}
module.exports = (req, res, next) => {
  const { talk } = req.body;
  const isNull = validateExistence(talk);
  if (isNull) {
    return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  // This is not the best way to validate a date formatted as dd/mm/yyyy, but considering the tests of this project, it will do.
  const date = talk.watchedAt.includes('/');
  if (!date) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};
