interface ILastFmArtistImage {
    ['#text']: string;
    size: string;
}

export interface ILastFmArtist {
    image: ILastFmArtistImage[];
    mbid: string;
    name: string;
    listeners: number;
    url: string;
}

export interface ILastFmTag {
    name: string;
    url: string;
}

export interface ILastFmArtistBio {
    links: {
        link: {
            ['#text']: string;
            rel: string;
            href: string;
        }
    }
    summary: string;
    content: string;
    published: Date;
}

export type SimilarArtist = {
    name: string;
    url: string;
    image: any[];
}

export interface ILastFmArtistDetails {
    name: string;
    url: string;
    mbid: string;
    similar: {
        artist: SimilarArtist[]
    },
    tags: {
        tag: ILastFmTag[]
    },
    bio: ILastFmArtistBio;
}

export interface IImage {
    ['#text']: string;
    size: 'small' | 'medium' | 'large' | 'extralarge';
}

export interface ILastFmAlbum {
    name: string;
    playcount: number;
    url: string;
    artist: {
        name: string;
        mbid: string;
        url: string;
    },
    image: IImage[];
}

export interface ILastFmAlbumResponse {
    topalbums: {
        album: ILastFmAlbum[];
    }
}

export interface ILastFmArtistDetailsResponse {
    artist: ILastFmArtistDetails;
}

export interface ILastFmArtistSearchResponse {
    results: {
        artistmatches: {
            artist: ILastFmArtist[]
        }
    }
}