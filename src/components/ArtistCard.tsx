import React, { useState, useCallback } from 'react';
import { IArtist, IArtistDetails } from '../api';
import { formatNumber } from '../utils';

import { fetchArtistDetails } from '../fetch';

export interface IArtistCardProps {
    artist: IArtist;
    key: string;
}

export interface IArtistDetailsProps {
    details: IArtistDetails;
}

const ArtistDetails = ({ details }: IArtistDetailsProps) => {
    return (
        <div className='artist-details-wrapper'>
            <p>{details.bio.summary}</p>
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
}

export const ArtistCard = ({ artist, key }: IArtistCardProps) => {
    const [ details, setDetails ] = useState<IArtistDetails>();

    const getArtistDetails = useCallback(async () => {
        const details = await fetchArtistDetails(artist.name);
        setDetails(details)
    }, [setDetails, artist])

    return (
        <div key={key} className='box artist-card-wrapper'>
            <div className='artist-card' onClick={getArtistDetails}>
                <div>{artist.name}</div>
                <div>{formatNumber(artist.listeners)} listeners</div>
                <div className='artist-card-icon'>
                    <a href={artist.url} target='_blank'>
                        <img src='lastfm-icon.png' />
                    </a>
                </div>
            </div>
            { details && (<ArtistDetails details={details} />) }
        </div>
    )
}