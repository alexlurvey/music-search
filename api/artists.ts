const repo = require('../repos');

module.exports = async (req, res) => {
  const data = await repo.searchArtists(req.query.search);
  res.status(200).send(data);
}
