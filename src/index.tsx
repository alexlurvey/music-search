import React from 'react';
import ReactDOM from 'react-dom';

fetch('api/artists?search=cher')
	.then((data) => {
		console.log(data);
	})
	.catch((err) => {
		console.log(err);
	})

const App = () => <h1>Hello Wantable</h1>;

ReactDOM.render(
  <App />,
  document.getElementById('app'),
)
