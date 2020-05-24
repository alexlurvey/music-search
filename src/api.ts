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