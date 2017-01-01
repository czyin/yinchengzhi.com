var express = require('express');
var app = express();

var handlebars = require('express3-handlebars')
    .create({
        defaultLayout: 'main'
    });
app.engine('handlebars', handlebars.engine);
app.set('views', './views')
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/statics'));

app.get('/', function(req, res) {
    res.render('home');
});

app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen('8080');
