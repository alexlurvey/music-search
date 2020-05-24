import { ILastFmArtist, ILastFmArtistDetails, SimilarArtist } from './api';
import { IArtist, IArtistDetails } from '../src/api';

export const artistXform = (artist: ILastFmArtist): IArtist => {
    return {
      // images are all blank - must not be included for free API keys
      // image: artist.image.map(q => ({ url: q['#text'], size: q.size })),
      listeners: artist.listeners,
      id: artist.mbid,
      name: artist.name,
      url: artist.url,
    }
  }

export const artistDetailsXform = (details: ILastFmArtistDetails): IArtistDetails => {
  return {
    name: details.name,
    url: details.url,
    similar: details.similar.artist.map((q: SimilarArtist) => ({
      name: q.name,
      url: q.url,
    })),
    tags: details.tags.tag,
    bio: {
      href: details.bio.links.link.href,
      published: details.bio.published,
      summary: removeLinkTagFromBio(details.bio.summary),
      content: removeLinkTagFromBio(details.bio.content),
    }
  }
}

const removeLinkTagFromBio = (str: string) => {
  return str.slice(0, str.indexOf('<a href=')).trim();
}