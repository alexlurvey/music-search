require('custom-env').env()
import * as  express from 'express';
import { searchArtists } from './repos';

const app = express()

app.get('/api/artists', async (req: any, res: any) => {
  const artists = await searchArtists(req.query.search)
  res.status(200).send(artists);
})

app.use(express.static('public'))
app.listen(3000)
