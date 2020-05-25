import React, { useMemo } from 'react';
import { IArtistInfo, IImage, IAlbum } from '../api';

export interface IArtistDetailsProps {
    artistInfo: IArtistInfo;
}

export const ArtistDetails = React.memo(({ artistInfo: { details, topAlbums} }: IArtistDetailsProps) => {
    const albumUrls: IImage[] = useMemo(() => {
        const res: IImage[] = [];
        topAlbums.slice(0, 4).forEach((a: IAlbum) => {
            const large = a.image.find(x => x.size === 'large');
            if (large) 
                res.push(large)
        })
        return res;
    }, [topAlbums])

    return (
        <div className='artist-details-wrapper'>
            <p>{details.bio.summary}</p>
            <div className='album-images-wrapper'>
                { albumUrls.map((a: IImage) => a && <img src={a.url} /> ) }
            </div>
            <div className='artist-tags-wrapper'>
                <div>Similar:</div>
                <div className='artist-tags'>
                    { details.similar.map(({ name, url }) => (
                        <a href={url} target='_blank'>{name}</a>
                    ))}
                </div>
            </div>
            <div className='artist-tags-wrapper'>
                <div>Tags:</div>
                <div className='artist-tags'>
                    { details.tags.map(({name, url}) => (
                        <a href={url} target='_blank'>{name}</a>
                    ))}
                </div>
            </div>
        </div>
    )
})