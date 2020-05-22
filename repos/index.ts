const axios = require('axios');

const { LASTFM_API_KEY, LASTFM_BASE_URL } = process.env;

const lastfm = axios.create({
  baseURL: LASTFM_BASE_URL,
}) 

export const searchArtists = async (search: string) => {
  try {
    const response = await lastfm.get(`?method=artist.search&artist=${search}&api_key=${LASTFM_API_KEY}&format=json`)
    return response.data.results;
  } catch (err) {
    console.log(err)
  }
}
