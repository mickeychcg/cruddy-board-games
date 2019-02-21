var express = require('express');
var methodOverride = require('method-Override');
var db = require('./models');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', function (req, res) {
  res.render('index');
});

// Index - get all games
app.get('/games', function (req, res) {
  //try and get all the records
  db.game.findAll().then(function (games) {
    console.log('are these the... ' + games);
    res.render('games/index', { games });
  });
  //find data within data object
  //res.render data into ejs page
});

app.get('/games/:id', function (req, res) {
  db.game.findById(parseInt(req.params.id)).then(function (game) {
    res.render('games/show', { game });
  })
})

app.listen(3000);

