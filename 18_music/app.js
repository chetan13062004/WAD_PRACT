const express = require('express');
const mongoose = require('mongoose');
const Song = require('./models/song');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/music')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// c) Insert 5 songs (Only once to avoid duplicates)
app.get('/insert', async (req, res) => {
  const songs = [
    { Songname: "Tum Hi Ho", Film: "Aashiqui 2", Music_director: "Mithoon", singer: "Arijit Singh" },
    { Songname: "Kal Ho Na Ho", Film: "Kal Ho Na Ho", Music_director: "Shankar-Ehsaan-Loy", singer: "Sonu Nigam" },
    { Songname: "Channa Mereya", Film: "ADHM", Music_director: "Pritam", singer: "Arijit Singh" },
    { Songname: "Tujh Mein Rab Dikhta Hai", Film: "RNBDJ", Music_director: "Salim-Sulaiman", singer: "Roop Kumar Rathod" },
    { Songname: "Kun Faya Kun", Film: "Rockstar", Music_director: "A.R. Rahman", singer: "Mohit Chauhan" }
  ];
  await Song.insertMany(songs);
  res.send("Inserted 5 songs!");
});

// d) Total count and list all
app.get('/', async (req, res) => {
  const songs = await Song.find();
  const count = await Song.countDocuments();
  res.render('index', { songs, count });
});

// e) List by Music Director
app.get('/musicdirector/:name', async (req, res) => {
  const songs = await Song.find({ Music_director: req.params.name });
  res.json(songs);
});

// f) List by Music Director + Singer
app.get('/mdsinger', async (req, res) => {
  const { director, singer } = req.query;
  const songs = await Song.find({ Music_director: director, singer: singer });
  res.json(songs);
});

// g) Delete a song
app.get('/delete/:name', async (req, res) => {
  await Song.deleteOne({ Songname: req.params.name });
  res.send(`Deleted song: ${req.params.name}`);
});

// h) Add new song
app.post('/add', async (req, res) => {
  const { Songname, Film, Music_director, singer } = req.body;
  await Song.create({ Songname, Film, Music_director, singer });
  res.redirect('/');
});

// i) Songs by singer from film
app.get('/singerfilm', async (req, res) => {
  const { singer, film } = req.query;
  const songs = await Song.find({ singer, Film: film });
  res.json(songs);
});

// j) Update document with Actor and Actress
app.get('/update/:name', async (req, res) => {
  await Song.updateOne(
    { Songname: req.params.name },
    { $set: { Actor: "Ranbir Kapoor", Actress: "Deepika Padukone" } }
  );
  res.send(`Updated song: ${req.params.name}`);
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
