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
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};
