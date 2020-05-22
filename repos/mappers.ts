import { ILastFmArtist } from './api';
import { IArtist } from '../src/api';

export const artistXform = (artist: ILastFmArtist): IArtist => {
    return {
      image: artist.image.map(q => ({ url: q['#text'], size: q.size })),
      listeners: artist.listeners,
      id: artist.mbid,
      name: artist.name,
      url: artist.url,
    }
  }