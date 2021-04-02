require('custom-env').env()
import * as express from 'express';
import { Request, Response } from 'express';
import { searchArtists, getTopArtists, getArtistDetails, getTopAlbums } from './repos';

const app = express()

app.get('/api/artists', async (req: Request, res: Response) => {
  const artists = await searchArtists(req.query.search as string)
  res.status(200).send(artists);
})

app.get('/api/chart/topartists', async (_req: Request, res: Response) => {
  const artists = await getTopArtists();
  res.status(200).send(artists);
})

app.get('/api/artist/:name', async (req: Request, res: Response) => {
  const details = await getArtistDetails(req.params.name)
  res.status(200).send(details);
})

app.get('/api/artist/:name/topalbums', async (req: Request, res: Response) => {
  const albums = await getTopAlbums(req.params.name);
  res.status(200).send(albums);
})

app.use(express.static('dist'))
app.listen(3000)
