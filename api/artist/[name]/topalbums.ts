import { NowRequest, NowRequestQuery, NowResponse } from '@now/node';
import { getTopAlbums } from '../../../repos';

interface IGetTopAlbumsQuery extends NowRequestQuery {
  name: string;
}

module.exports = async (req: NowRequest, res: NowResponse) => {
  const data = await getTopAlbums((req.query as IGetTopAlbumsQuery).name);
  res.status(200).send(data);
}
