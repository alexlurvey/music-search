# Music Search
Query artist information using [last.fm's](https://www.last.fm/api/) API

### Features
- Search by name or get the top artist list. Returns a list of 30 (no further paging, but that's what I was going to add next).
- Order by name or listener count. Clearing those filters return the original search list ordering returned by last.fm.
- Any images will link to a last.fm page.

### Frontend Notes
- All state is kept in [index.tsx](./src/index.tsx).
- Two API calls are made to get the artist info (`api/artist/${name}`, `api/artist/${name}/topalbums`). These responses are stored in an object keyed by artist name and controlled by the reducer pattern [here](./src/artistInfoStore.ts).
- All styling is in one [file](./styles.css) - would probably move styles alongside the components and/or use some styling library for anything larger.

### Directory Structure
- `api`: serverless functions that match the endpoints found in [server.ts](./server.ts) for deployment on the [vercel](https://vercel.com/) platform.
- `assets`: images and such for frontend.
- `repos`: data repositories that call last.fm's API and map the responses to the domain model defined [here](./src/api.ts).
- `src`: contents of the SPA built with React.

### Running Locally
```
git clone https://github.com/alexlurvey/wantable-app.git && cd wantable-app
yarn install
yarn dev
```