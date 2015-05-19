var express = require('express'),
	handlebars = require('express-handlebars');

var app = express();

var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
];

// ----------------------------------------------------------------------------------------------------


// Set-Up handlebars engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);


// Static content
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortune: randomFortune });
});

// Custom 404 page
app.use(function(req, res) {
	res.status(404);
	res.render('404', { layout: false });
});

// Custom 500 page
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});


app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl+C to terminate');
});