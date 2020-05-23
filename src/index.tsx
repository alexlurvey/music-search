import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { IArtist } from './api';
import { ArtistCard } from './components/ArtistCard';

const fetchArtists = async (search: string): Promise<IArtist[]> => {
	const response = await fetch(`api/artists?search=${search}`);
	const data = await response.json();
	return data;
}

const App = () => {
	const [ search, setSearch ] = useState<string>('');
	const [ artists, setArtists ] = useState<any[]>([]);

	const searchArtists = useCallback(async () => {
		const artists = await fetchArtists(search);
		setArtists(artists);
	}, [search, setArtists])

	return (
		<div className='container app-wrapper'>
			<input className='input search-bar' type='text' placeholder='Search artists' value={search} onChange={(e) => setSearch(e.target.value)} />
			<button onClick={_ => searchArtists()}>Search</button>
			{ artists.map((a: IArtist) => <ArtistCard key={a.id} artist={a} />) }
		</div>
	)
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
)
