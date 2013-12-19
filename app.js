var express = require('express');
var app = express();
var hbs = require('hbs');

var blogEngine = require('./models/blog');


app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index',{title:"Simple boilerplate for Node, express and handlebar.js"});
});

app.get('/blog', function(req, res) {
    res.render('blog',{title:"My Blog", entries:blogEngine.getBlogEntries()});
});

app.get('/about', function(req, res) {
    res.render('about', {title:"About Me"});
});

app.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});
});

app.listen(3000);
console.log('Listening to port 3000');