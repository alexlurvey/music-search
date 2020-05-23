import { NowRequest, NowResponse } from '@now/node';
import { getTopArtists } from '../../repos';

module.exports = async (_req: NowRequest, res: NowResponse) => {
    const data = await getTopArtists();
    res.status(200).send(data);
}