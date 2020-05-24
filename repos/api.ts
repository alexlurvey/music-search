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