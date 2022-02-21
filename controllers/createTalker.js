const { readFile, writeFile } = require('fs/promises');

const PATH = './talker.json';

module.exports = async (req, res, next) => {
  try {
    const { name, age, talk } = req.body;
    const talkers = JSON.parse(await readFile(PATH, 'utf-8'));
    const newTalker = {
      id: talkers.length + 1,
      name,
      age,
      talk: {
        watchedAt: talk.watchedAt,
        rate: talk.rate,
      },
    };
    talkers.push(newTalker);
    await writeFile(PATH, JSON.stringify(talkers, null, 2));
    return res.status(201).json(newTalker);
  } catch (e) {
    return next(e);
  }
};
