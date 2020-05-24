import { NowRequest, NowRequestQuery, NowResponse } from '@now/node';
import { getArtistDetails } from '../../repos';

interface IArtistDetailsQuery extends NowRequestQuery {
  name: string;
}

module.exports = async (req: NowRequest, res: NowResponse) => {
  const data = await getArtistDetails((req.query as IArtistDetailsQuery).name);
  res.status(200).send(data);
}
