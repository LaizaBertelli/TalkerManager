const getTalkers = require('./getTalkers');
const getTalkerById = require('./getTalkerById');
const newlogin = require('./newLogin');
const createTalker = require('./createTalker');
const editTalker = require('./editTalker');
const deleteTalker = require('./deleteTalker');
const searchTalker = require('./searchTalker');

module.exports = {
  getTalkers,
  getTalkerById,
  newlogin,
  createTalker,
  editTalker,
  deleteTalker,
  searchTalker,
};
