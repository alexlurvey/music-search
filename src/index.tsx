import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { IArtist } from './api';
import { ArtistCard } from './components/ArtistCard';

const fetchArtists = async (search: string): Promise<IArtist[]> => {
	const response = await fetch(`api/artists?search=${search}`);
	const data = await response.json();
	return data;
}

const fetchTopArtists = async (): Promise<IArtist[]> => {
	const response = await fetch('api/chart/topartists');
	const data = await response.json();
	return data;
}

const App = () => {
	const [ search, setSearch ] = useState<string>('');
	const [ timeoutId, setTimeoutId ] = useState<number>(0);
	const [ artists, setArtists ] = useState<IArtist[]>([]);
	const [ artistClass, setArtistClass ] = useState<string>('');

	const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const val = (e.target as HTMLInputElement).value
		if (timeoutId > 0) {
			clearTimeout(timeoutId);
		}
		setSearch(val);
		if (val.length) {
			const id = window.setTimeout(async () => {
				const data = await fetchArtists(val);
				setArtists(data);
				if (artists.length) {
					setArtistClass('fade-out')
					setTimeout(() => setArtistClass(''), 500)
				}
			}, 650)
			setTimeoutId(id);
		} else {
			setArtists([])
		}
	}, [artists, timeoutId, setArtists, setSearch, setTimeoutId, setArtistClass])

	const handleTopArtistSearch = useCallback(async () => {
		const data = await fetchTopArtists();
		setArtists(data);
	}, [setArtists])

	return (
		<div className='container app-wrapper'>
			<input className='input search-bar' type='text' placeholder='Search artists' value={search} onChange={handleSearchChange} />
			<div className={`${artistClass} box`}>
				{ 
					artists.length
						? artists.map((a: IArtist) => (
							<div className='fade-in'>
								<ArtistCard key={a.id || a.name} artist={a} />
							</div>))
						: (
							<h5 className='title is-5'>
								Enter an artist name or <a onClick={handleTopArtistSearch}>search top artists</a>
							</h5>
						)
				}
			</div>
		</div>
	)
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
)
