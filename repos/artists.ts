import { lastfm } from './fetch';
import { artistXform, artistDetailsXform } from './mappers';

const { LASTFM_API_KEY } = process.env;

export const searchArtists = async (search: string) => {
    try {
      const response = await lastfm.get(`?method=artist.search&artist=${search}&api_key=${LASTFM_API_KEY}&format=json`)
      const matches = response.data.results.artistmatches;
      return typeof matches === 'object' ? matches.artist.map(artistXform) : []
    } catch (err) {
      console.log(err)
    }
  }

export const getArtistDetails = async (name: string) => {
  try {
    const response = await lastfm.get(`?method=artist.getinfo&artist=${name}&api_key=${LASTFM_API_KEY}&format=json`)
    return artistDetailsXform(response.data.artist)
  } catch (err) {
    console.log(err)
  }
}