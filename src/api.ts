export interface IObjectOf<T> {
    [key: string]: T;
}

type SimilarArtist = {
    name: string;
    url: string;
}
type Tag = SimilarArtist;

export interface IArtist {
    id: string;
    name: string;
    url: string;
    listeners: number;
}

export interface IArtistDetails {
    name: string;
    url: string;
    similar: SimilarArtist[];
    tags: Tag[];
    bio: {
        href: string;
        published: Date;
        summary: string;
        content: string;
    }
}

export enum OrderByOption {
    Listeners = 'listeners',
    Name = 'name',
}

export interface IImage {
    url: string;
    size: 'small' | 'medium' | 'large' | 'extralarge';
}
export interface IAlbum {
    name: string;
    url: string;
    image: IImage[];
}

export interface IArtistInfo {
	details: IArtistDetails,
	topAlbums: IAlbum[],
}