const { readFile } = require('fs/promises');
const PATH = './talker.json';

module.exports = async (req, res, next) => {
  try {
    const talkers = JSON.parse(await readFile(PATH, 'utf-8'));

    return res.status(200).json(talkers);
  } catch(e) {
    return next(e);
  }
};
