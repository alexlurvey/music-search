import React from 'react';
import { IArtist, IArtistDetails } from '../api';
import { formatNumber } from '../utils';

export interface IArtistCardProps {
    artist: IArtist;
    key: string;
    details?: IArtistDetails;
    isSelected: boolean;
    isLoading: boolean;
    onClick(name: string): void;
}

interface IArtistDetailsProps {
    details: IArtistDetails;
}

const ArtistDetails = React.memo(({ details }: IArtistDetailsProps) => (
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
))

export const ArtistCard = React.memo(({ artist, key, details, isSelected, isLoading, onClick }: IArtistCardProps) => (
    <div key={key} className={`box artist-card-wrapper ${isLoading && !details ? 'loading-background': ''}`}>
        <div className='artist-card' onClick={() => onClick(artist.name)}>
            <div>{artist.name}</div>
            <div>{formatNumber(artist.listeners)} listeners</div>
            <div className='artist-card-icon'>
                <a href={artist.url} target='_blank'>
                    <img src='lastfm-icon.png' />
                </a>
            </div>
        </div>
        { isSelected && details && (<ArtistDetails details={details} />) }
    </div>
))