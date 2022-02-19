module.exports = (_req, res, _next) => {
  return res.status(500).json({ message: 'Something went wrong' });
};
