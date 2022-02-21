const { readFile, writeFile } = require('fs/promises');

const PATH = './talker.json';

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const talkers = JSON.parse(await readFile(PATH, 'utf-8'));
    const talkerIndex = talkers.findIndex((talker) => talker.id === id);
    const deletedTalker = talkers.splice(talkerIndex, 1)[0];
    await writeFile(PATH, JSON.stringify(deletedTalker));
    return res.status(204).json({ deletedTalker });
  } catch (e) {
    return next(e);
  }
};
