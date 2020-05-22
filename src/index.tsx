import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { IArtist } from './api';

const fetchArtists = async (search: string): Promise<IArtist[]> => {
	const response = await fetch(`api/artists?search=${search}`);
	const data = await response.json();
	return data;
}

const App = () => {
	const [ search, setSearch ] = useState<string>('');
	const [ artists, setArtists ] = useState<any[]>([]);

	const searchArtists = useCallback(async () => {
		// TODO: validation
		const artists = await fetchArtists(search);
		setArtists(artists);
	}, [search, setArtists])

	return (
		<div className='container app-wrapper'>
			<h1 className='title is-2'>Search artists</h1>
			<input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
			<button onClick={_ => searchArtists()}>Search</button>
			{
				artists.map((a: IArtist) => <div>{a.name}</div>)
			}
		</div>
	)
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
)
