import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { IArtist } from './api';
import { fetchArtists, fetchTopArtists } from './fetch';
import { ArtistCard } from './components';

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
						? (
							<div className='fade-in'>
								{ artists.map((a: IArtist) => <ArtistCard key={a.id || a.name} artist={a} />) }
							</div>
						) : (
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
