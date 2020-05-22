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