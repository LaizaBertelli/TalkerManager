const { readFile, writeFile } = require('fs/promises');

const PATH = './talker.json';

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = JSON.parse(await readFile(PATH, 'utf-8'));
    const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
    console.log(id);
    // reatribuições - not the best way ?
    talkers[talkerIndex].name = name;
    talkers[talkerIndex].age = age;
    talkers[talkerIndex].talk = talk;
    await writeFile(PATH, JSON.stringify(talkers, null, 2));
    return res.status(200).json(talkers[talkerIndex]);
  } catch (e) {
    return next(e);
  }
}
