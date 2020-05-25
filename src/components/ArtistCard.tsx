import React, { useCallback, useState } from 'react';
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

export const ArtistCard = ({ artist, key, artistInfo, isSelected, isLoading, onClick }: IArtistCardProps) => {
    const [ detailsClass, setDetailsClass ] = useState<string>('');

    const handleClick = useCallback(() => {
        if (isSelected) {
            setDetailsClass('slide-up');
            setTimeout(() => {
                setDetailsClass('')
                onClick(artist.name)
            }, 500);
        } else {
            onClick(artist.name)
        }
    }, [isSelected, artist.name, onClick, setDetailsClass])

    return (
        <div key={key} className={`box artist-card-wrapper ${isLoading && !artistInfo ? 'loading-background': ''}`}>
            <div className='artist-card' onClick={handleClick}>
                <div>{artist.name}</div>
                <div>{formatNumber(artist.listeners)} listeners</div>
                <div className='artist-card-icon'>
                    <a href={artist.url} target='_blank'>
                        <img src='lastfm-icon.png' />
                    </a>
                </div>
            </div>
            { isSelected && artistInfo && (<ArtistDetails className={detailsClass} artistInfo={artistInfo} />) }
        </div>
    )
}