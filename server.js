const express = require('express');

const port = process.env.PORT || 3000;

var app = express();

app.use((req, res, next) => {
	if (req.headers['x-forwarded-proto'] === 'https') {
		res.redirect('http://' + req.hostname + req.url);
	}
	else {
		next();
	}
});

app.use(express.static(__dirname + '/public'));

app.listen(port, () => console.log('Server is up in port 3000'));
