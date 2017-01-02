var express = require('express')
var engines = require('consolidate')
var app = express()
var opn = require('opn')

app.set('views', __dirname + '/dist/views/')
app.engine('html', engines.mustache)
app.set('view engine', 'html')

app.use(express.static(__dirname + '/dist/statics/'))

app.get('/', function(req, res) {
    res.render('index.html')
})

app.get('/slides', function(req, res) {
    res.render('slides/index.html')
})

app.get('/slide/webpack-vue-sharing', function(req, res) {
    res.render('slides/webpack-vue-sharing.html')
})

app.use(function(req, res, next) {
    res.redirect('/')
})

app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500)
    res.render('errors/500.html')
})

app.listen('8080')

if (process.env.NODE_ENV === 'development') {
    var uri = 'http://localhost:' + '8080'
    console.log('Listening at ' + uri + '\n')
    opn(uri)
}
