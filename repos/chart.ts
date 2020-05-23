import { lastfm } from './fetch';
import { artistXform } from './mappers';

const { LASTFM_API_KEY } = process.env;

export const getTopArtists = async () => {
    try {
        const response = await lastfm.get(`?method=chart.gettopartists&api_key=${LASTFM_API_KEY}&format=json`);
        return response.data.artists.artist.map(artistXform);
    } catch (err) {
        console.log(err)
    }
}