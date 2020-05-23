import { searchArtists } from '../repos';

module.exports = async (req, res) => {
  const data = await searchArtists(req.query.search);
  res.status(200).send(data);
}
