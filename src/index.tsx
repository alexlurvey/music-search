import React, { useCallback, useMemo, useReducer, useState, Reducer } from 'react';
import ReactDOM from 'react-dom';
import { IArtist, IObjectOf, OrderByOption, IArtistInfo } from './api';
import { fetchArtists, fetchTopArtists, fetchArtistDetails, fetchTopAlbums } from './fetch';
import { artistInfoReducer, actionCreators, ArtistInfoAction } from './artistInfoStore';
import { ArtistCard, Filters, SearchBar } from './components';

const App = () => {
	// State
	const [ search, setSearch ] = useState<string>('');
	const [ artistInfoState, dispatch ] = useReducer<Reducer<IObjectOf<IArtistInfo>, ArtistInfoAction>>(artistInfoReducer, {} as IObjectOf<IArtistInfo>);
	const [ artists, setArtists ] = useState<IArtist[]>([]);
	const [ selectedArtist, setSelectedArtist ] = useState<string | undefined>();
	const [ orderBy, setOrderBy ] = useState<OrderByOption | undefined>();
	// CSS related state
	const [ timeoutId, setTimeoutId ] = useState<number>(0);
	const [ artistClass, setArtistClass ] = useState<string>('');
	const [ loadingArtist, setLoadingArtist ] = useState<string | undefined>();
	const [ loading, setLoading ] = useState<boolean>(false);

	// Derived State
	const orderedArtists = useMemo(() => {
		const copy = [...artists];
		if (orderBy === OrderByOption.Listeners)
			return copy.sort((a, b) => b.listeners - a.listeners);
		if (orderBy === OrderByOption.Name)
			return copy.sort((a, b) => a.name < b.name ? -1 : 1);
		return artists;
	}, [artists, orderBy])

	// Handlers
	const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const val = (e.target as HTMLInputElement).value
		if (timeoutId > 0) {
			clearTimeout(timeoutId);
		}
		setSearch(val);
		if (val.length) {
			const id = window.setTimeout(async () => {
				setLoading(true);
				const data = await fetchArtists(val);
				setArtists(data);
				setOrderBy(undefined);
				setLoading(false);
				if (artists.length) {
					setArtistClass('fade-out')
					setTimeout(() => setArtistClass(''), 500)
				}
			}, 650)
			setTimeoutId(id);
		} else {
			setArtists([])
		}
	}, [artists, timeoutId, setArtists, setSearch, setTimeoutId, setArtistClass, setLoading, setOrderBy])

	const handleTopArtistSearch = useCallback(async () => {
		setLoading(true);
		const data = await fetchTopArtists();
		setArtists(data);
		setOrderBy(undefined);
		setLoading(false);
	}, [setArtists, setLoading])

	const onArtistClick = useCallback(async (name: string) => {
		if (!artistInfoState[name]) {
			setLoadingArtist(name);
			const [ deets, topalbums ] = await Promise.all([
				fetchArtistDetails(name),
				fetchTopAlbums(name)],
			);
			dispatch(actionCreators.addDetails(name, deets))
			dispatch(actionCreators.addTopAlbums(name, topalbums))
		}
		setSelectedArtist(prev => name === prev ? undefined : name);
	}, [artistInfoState, dispatch, setSelectedArtist, setLoadingArtist])

	const handleOrderBySelection = useCallback((value?: OrderByOption) => {
		setOrderBy(value);
	}, [setOrderBy])

	const handleSearchClear = useCallback(() => {
		setSearch('')
		setArtists([])
	}, [setSearch, setArtists])

	return (
		<div className='container app-wrapper'>
			<SearchBar
				value={search}
				isSearching={loading}
				onSearch={handleSearchChange}
				onClear={handleSearchClear}
			/>
			<div className={`${artistClass} box`}>
			{
				orderedArtists.length
					? (
						<div className='fade-in'>
							<Filters selection={orderBy} onOrderByClick={handleOrderBySelection} />
							{ orderedArtists.map((a: IArtist) =>
								<ArtistCard 
									key={a.id || a.name}
									artist={a}
									onClick={onArtistClick}
									artistInfo={artistInfoState[a.name]}
									isSelected={a.name === selectedArtist}
									isLoading={a.name === loadingArtist}
								/>)
							}
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
