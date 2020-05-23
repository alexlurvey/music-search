import { getTopArtists } from '../../repos';

module.exports = async (_req, res) => {
    const data = await getTopArtists();
    res.status(200).send(data);
}