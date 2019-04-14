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

// GET/ games - get all games - Index
app.get('/games', function (req, res) {
  db.game.findAll().then(function (games) {
    res.render('games/index', { games });
  });
});

// GET method to add a new game
app.get('/games/new', function (req, res) {
  res.render('games/create');
});

// POST - create a new game - Create
app.post('/games', function (req, res) {
  db.game.create({
    name: req.body.name,
    description: req.body.description,
    players: req.body.players
  }).then (function(data) {
      res.redirect('/games');
  }).catch ( 
    function(err) {
      res.send(err.errors(0).message);
  });
});

// GET /games/3 - gets one game - Show
app.get('/games/:id', function (req, res) {
  db.game.findByPk(req.params.id).then(function (game) {
    res.render('games/show', { game });
  });
});

// DELETE /games/ - Delete

app.delete('games/:id', function (req, res) {
  db.game.destroy({
    where: { id: req.params.id }
  }).then(function () {
    res.redirect('/games');
  });
});
// GET /games/id/edit - returns populated edit form - Edit
app.get('/games/:id/edit', function (req, res) {
  db.game.findByPk(req.params.id).then(function (game) {
    res.render('games/edit', { game });
  });
});

//
// PUT /games/ - Update
app.put('/games/:id', function (req, res) {
  db.game.findOne({
    where: { id: req.params.id }

    })
    .then(function (game) {
      game.update({
        name: req.body.name,
        description: req.body.description,
        players: req.body.players
      });
    })
      .then(function (game) { 
        res.redirect('/games/' + req.params.id);
  });
});

app.listen(3000);
  console.log('listening on port 3000');


