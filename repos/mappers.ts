import { ILastFmArtist, ILastFmArtistDetails, ILastFmAlbum, SimilarArtist, IImage } from './api';
import { IArtist, IArtistDetails, IAlbum } from '../src/api';

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

export const albumXform = (album: ILastFmAlbum): IAlbum => {
  return {
    name: album.name,
    url: album.url,
    image: album.image.map((img: IImage) => ({
      url: img["#text"],
      size: img.size,
    }))
  }
}

const removeLinkTagFromBio = (str: string) => {
  return str.slice(0, str.indexOf('<a href=')).trim();
}