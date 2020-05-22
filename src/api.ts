interface IArtistImage {
    url: string;
    size: string;
}

export interface IArtist {
    image: IArtistImage[];
    id: string;
    name: string;
    url: string;
    listeners: number;
}