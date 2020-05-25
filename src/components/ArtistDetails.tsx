import React, { useMemo } from 'react';
import { IArtistInfo, IImage, IAlbum } from '../api';
import { useClientWidth } from '../hooks';

export interface IArtistDetailsProps {
    className?: string;
    artistInfo: IArtistInfo;
}

export const ArtistDetails = ({ className, artistInfo: { details, topAlbums} }: IArtistDetailsProps) => {
    const [ _, { isExtraSmall, isPhone } ] = useClientWidth();

    const albumUrls: ({ albumUrl: string } & IImage)[] = useMemo(() => {
        const res: ({ albumUrl: string } & IImage)[] = [];
        topAlbums.slice(0, 4).forEach((a: IAlbum) => {
            const size = isExtraSmall ? 'small' : isPhone ? 'medium' : 'large';
            const large = a.image.find(x => x.size === size);
            if (large) 
                res.push({ ...large, albumUrl: a.url })
        })
        return res;
    }, [topAlbums, isExtraSmall, isPhone])

    return (
        <div className={`artist-details-wrapper ${className}`}>
            <p>{details.bio ? details.bio.summary : ''}</p>
            <div className='album-images-wrapper'>
                { albumUrls.map((a) => <a href={a.albumUrl} target='_blank'><img src={a.url} /></a> ) }
            </div>
            <div className='artist-tags-wrapper'>
                <div>Similar:</div>
                <div className='artist-tags'>
                    { details.similar ? details.similar.map(({ name, url }) => (
                        <a href={url} target='_blank'>{name}</a>
                    )) : null}
                </div>
            </div>
            <div className='artist-tags-wrapper'>
                <div>Tags:</div>
                <div className='artist-tags'>
                    { details.tags ? details.tags.map(({name, url}) => (
                        <a href={url} target='_blank'>{name}</a>
                    )) : null}
                </div>
            </div>
        </div>
    )
}