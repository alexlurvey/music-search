require('custom-env').env()
const express = require('express')
const searchArtists = require('./repos').searchArtists

const app = express()

app.get('/api/artists', async (req: any, res: any) => {
  console.log('getting artis')
  const artists = await searchArtists(req.query.search)
  console.log(artists)
  res.status(200).send(artists);
})

app.use(express.static('public'))
app.listen(3000)
