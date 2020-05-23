import { IArtist } from '../api';

export const fetchArtists = async (search: string): Promise<IArtist[]> => {
	const response = await fetch(`api/artists?search=${search}`);
	const data = await response.json();
	return data;
}

export const fetchTopArtists = async (): Promise<IArtist[]> => {
	const response = await fetch('api/chart/topartists');
	const data = await response.json();
	return data;
}