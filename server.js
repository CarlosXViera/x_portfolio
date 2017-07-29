const express = require('express');
const path = require('path');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');


const port = process.env.PORT || 3000;

var app = express();



app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

let handleEmailSubmit = ({
	body
}, res) => {
	let transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'CarlosXViera@gmail.com',
			pass: 'zBR==WA2!'
		}
	});

	let mailData = {
		from: `${body.name} <${body.email}>`, // sender address
		to: 'CarlosXViera@gmail.com', // list of receivers
		subject: body.subject, // Subject line
		text: `${body.message} from ${body.email}` // plain text body
	};

	transporter.sendMail(mailData, function (error, info) {
		if (error) {
			console.log(error);
			res.json({
				yo: 'error'
			});
		} else {
			console.log('Message sent: ' + info.response);
			res.json({
				yo: info.response
			});
		};
	});

}

app.use((req, res, next) => {
	if (req.headers['x-forwarded-proto'] === 'https') {
		res.redirect('http://' + req.hostname + req.url);
	} else {
		next();
	}
});

app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname + '/public', 'index.html'))
})

app.post('/sayHello', handleEmailSubmit);

app.listen(port, () => console.log('Server is up in port 3000'));
