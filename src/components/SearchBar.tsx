import React from 'react';

export interface ISearchBarProps {
    value: string;
    isSearching: boolean;
    onSearch(e: React.ChangeEvent<HTMLInputElement>): void;
    onClear(): void;
}

export const SearchBar = React.memo(({ value, isSearching, onClear, onSearch }: ISearchBarProps) => (
    <div className='search-bar-wrapper'>
        <input
            className={`input ${isSearching ? 'loading-background' : ''}`}
            type='text'
            placeholder='Search artists'
            value={value}
            onChange={onSearch}>
        </input>
        <img src='x-icon.png' onClick={onClear} />
    </div>
))