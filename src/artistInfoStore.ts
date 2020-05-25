import { IAlbum, IArtistDetails, IArtistInfo, IObjectOf } from './api';

const ADD_DETAILS = 'ADD_DETAILS';
const ADD_TOPALBUMS = 'ADD_TOPALBUMS';

type Action<T> = {
	type: string,
	name: string,
	payload: T,
}
export type ArtistInfoAction = Action<IArtistDetails | IAlbum[]>;

export const actionCreators = {
	addDetails (name: string, payload: IArtistDetails): Action<IArtistDetails> {
		return { type: ADD_DETAILS, name, payload }
	},
	addTopAlbums (name: string, payload: IAlbum[]): Action<IAlbum[]> {
		return { type: ADD_TOPALBUMS, name, payload }
	}
}

export const artistInfoReducer = (state: IObjectOf<IArtistInfo>, action: ArtistInfoAction) => {
	switch (action.type) {
		case ADD_DETAILS:
			return {
				...state,
				[action.name]: {
					...state[action.name],
					details: action.payload as IArtistDetails,
				}
			}
		case ADD_TOPALBUMS:
			return {
				...state,
				[action.name]: {
					...state[action.name],
					topAlbums: action.payload as IAlbum[],
				}
			}
		default:
			return state;
	}
}