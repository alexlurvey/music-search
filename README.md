# Music Search
Query artist information using [last.fm's](https://www.last.fm/api/) API

### Directory Structure
- `api`: serverless functions that match the endpoints found in [server.ts](./server.ts) for deployment on the [vercel](https://vercel.com/) platform.
- `assets`: images and such for frontend.
- `repos`: data repositories that call last.fm's API and map the responses to the domain model defined [here](./src/api.ts).
- `src`: contents of the SPA built with React.