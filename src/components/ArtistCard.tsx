import React from 'react';
import { IArtist, IArtistInfo } from '../api';
import { formatNumber } from '../utils';
import { ArtistDetails } from './ArtistDetails';

export interface IArtistCardProps {
    artist: IArtist;
    key: string;
    artistInfo?: IArtistInfo;
    isSelected: boolean;
    isLoading: boolean;
    onClick(name: string): void;
}

export const ArtistCard = React.memo(({ artist, key, artistInfo, isSelected, isLoading, onClick }: IArtistCardProps) => (
    <div key={key} className={`box artist-card-wrapper ${isLoading && !artistInfo ? 'loading-background': ''}`}>
        <div className='artist-card' onClick={() => onClick(artist.name)}>
            <div>{artist.name}</div>
            <div>{formatNumber(artist.listeners)} listeners</div>
            <div className='artist-card-icon'>
                <a href={artist.url} target='_blank'>
                    <img src='lastfm-icon.png' />
                </a>
            </div>
        </div>
        { isSelected && artistInfo && (<ArtistDetails artistInfo={artistInfo} />) }
    </div>
))