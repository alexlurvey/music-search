fetch('http://localhost:3000/api/artists?search=cher')
	.then((data) => {
		console.log(data);
	})
	.catch((err) => {
		console.log(err);
	})
