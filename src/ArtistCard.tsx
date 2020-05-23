import React from 'react';
import { IArtist } from './api';
import { formatNumber } from './utils';

export interface IArtistCardProps {
    artist: IArtist;
    key: string;
}

export const ArtistCard = ({ artist, key }: IArtistCardProps) => {
    return (
        <div key={key} class='box artist-card'>
            <div>{artist.name}</div>
            <div>{formatNumber(artist.listeners)} listeners</div>
            <div className='artist-card-icon'>
                <a href={artist.url} target='_blank'>
                    <img src='assets/lastfm-icon.png' />
                </a>
            </div>
        </div>
    )
}