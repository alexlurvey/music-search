import { NowRequest, NowRequestQuery, NowResponse } from '@now/node';
import { searchArtists } from '../repos';

interface IArtistSearchQuery extends NowRequestQuery {
  search: string;
}

module.exports = async (req: NowRequest, res: NowResponse) => {
  const data = await searchArtists((req.query as IArtistSearchQuery).search);
  res.status(200).send(data);
}
