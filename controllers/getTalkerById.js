const { readFile } = require('fs/promises');
const PATH = './talker.json';

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const talkers = JSON.parse(await readFile(PATH, 'utf-8'));

    const filteredTalkers = talkers.find((talker) => talker.id === Number(id));

    if ( !filteredTalkers ) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    return res.status(200).json(filteredTalkers);
  } catch(e) {
    return next(e);
  }
};
