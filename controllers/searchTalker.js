const { readFile } = require('fs/promises');

const PATH = './talker.json';

module.exports = async (req, res, next) => {
  try {
    const { searchTerm = '' } = req.query;
    const talkers = JSON.parse(await readFile(PATH, 'utf-8'));
    const filteredTalkers = talkers.filter((talker) => talker.name.includes(searchTerm));
    if (!filteredTalkers) {
      return res.status(200).json([]);
    }
    return res.status(200).json(filteredTalkers);
  } catch (e) {
    return next(e);
  }
};
