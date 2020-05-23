import axios from 'axios';
import { artistXform } from './mappers';

const { LASTFM_API_KEY, LASTFM_BASE_URL } = process.env;
const lastfm = axios.create({ baseURL: LASTFM_BASE_URL })

export const searchArtists = async (search: string) => {
  try {
    const response = await lastfm.get(`?method=artist.search&artist=${search}&api_key=${LASTFM_API_KEY}&format=json`)
    const matches = response.data.results.artistmatches;
    return typeof matches === 'object' ? matches.artist.map(artistXform) : []
  } catch (err) {
    console.log(err)
  }
}