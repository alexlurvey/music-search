import { lastfm } from './fetch';
import { artistXform, artistDetailsXform, albumXform } from './mappers';
import {
  ILastFmAlbumResponse,
  ILastFmArtistDetailsResponse,
  ILastFmArtistSearchResponse,
} from './api';

const { LASTFM_API_KEY } = process.env;

export const searchArtists = async (search: string) => {
    try {
      const response = await lastfm.get<ILastFmArtistSearchResponse>(`?method=artist.search&artist=${search}&api_key=${LASTFM_API_KEY}&format=json`)
      const matches = response.data.results.artistmatches;
      return typeof matches === 'object' ? matches.artist.map(artistXform) : []
    } catch (err) {
      console.log(err)
    }
  }

export const getArtistDetails = async (name: string) => {
  try {
    const response = await lastfm.get<ILastFmArtistDetailsResponse>(`?method=artist.getinfo&artist=${name}&api_key=${LASTFM_API_KEY}&format=json`)
    return response.data.artist ? artistDetailsXform(response.data.artist) : {};
  } catch (err) {
    console.log(err)
  }
}

export const getTopAlbums = async (name: string) => {
  try {
    const response = await lastfm.get<ILastFmAlbumResponse>(`?method=artist.gettopalbums&artist=${name}&api_key=${LASTFM_API_KEY}&format=json`)
    return response.data?.topalbums?.album?.map(albumXform) || [];
  } catch (err) {
    console.log(err)
  }
}