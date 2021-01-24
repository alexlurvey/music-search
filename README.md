# Music Search
Demo app to showcase a React frontend. Queries artist information using [last.fm's](https://www.last.fm/api/) API.

### Features
- Search by name or get the top artist list. Returns a list of 30 (no further paging, but that's what I was going to add next). There may not be any data if a search result refers to a single or a lesser known band in which case you'll just see an empty section underneath the artist.

  - A search request is fired based on a timer (650ms after the last keystroke). It probably makes sense to do this on an Enter keypress as well.
- Order by name or listener count. Clearing those filters return the original search list ordering returned by last.fm.
- Any images will link to a last.fm page.

### Frontend Notes
- All state is kept in [index.tsx](./src/index.tsx).
- Two API calls are made to get the artist info (`api/artist/${name}`, `api/artist/${name}/topalbums`). These responses are stored in an object keyed by artist name and controlled by the reducer pattern [here](./src/artistInfoStore.ts).
- All styling is in one [file](./styles.css) - would probably move styles alongside the components and/or use some styling library for anything larger.
- [Bluma](https://bulma.io/) is used for some styling. 

### Directory Structure
- `api`: serverless functions that match the endpoints found in [server.ts](./server.ts) for deployment on the [vercel](https://vercel.com/) platform.
- `assets`: images and such for frontend.
- `repos`: data repositories that call last.fm's API and map the responses to the domain model defined [here](./src/api.ts).
- `src`: contents of the SPA built with React.

### Running Locally
```
git clone https://github.com/alexlurvey/music-search.git && cd music-search
yarn install
yarn dev
```
also create a `.env` file in to root directory containing
```
LASTFM_BASE_URL=http://ws.audioscrobbler.com/2.0/
LASTFM_API_KEY=<YOUR_API_KEY>
```
