var express = require('express'),
	path = require('path'),
	http = require('http'),
	app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(req, res){ 
	res.render('layout');
});

app.listen(app.get('port'));
console.log('SERVER:: inited on '+app.get('port'));
