const Song = require('../models/song');

// Insert 5 songs
exports.insertSongs = async (req, res) => {
    const songs = [
        { Songname: 'Song1', Film: 'Film1', Music_director: 'Director1', Singer: 'Singer1' },
        { Songname: 'Song2', Film: 'Film2', Music_director: 'Director2', Singer: 'Singer2' },
        { Songname: 'Song3', Film: 'Film1', Music_director: 'Director1', Singer: 'Singer2' },
        { Songname: 'Song4', Film: 'Film3', Music_director: 'Director3', Singer: 'Singer3' },
        { Songname: 'Song5', Film: 'Film4', Music_director: 'Director2', Singer: 'Singer1' }
    ];
    await Song.insertMany(songs);
    res.send('5 songs inserted successfully!');
};

// List all songs
exports.listSongs = async (req, res) => {
    const songs = await Song.find();
    const count = await Song.countDocuments();
    res.render('list', { songs, count });
};

// List by Music Director
exports.songsByDirector = async (req, res) => {
    const songs = await Song.find({ Music_director: req.params.director });
    res.render('list', { songs, count: songs.length });
};

// List by Director and Singer
exports.songsByDirectorSinger = async (req, res) => {
    const songs = await Song.find({
        Music_director: req.params.director,
        Singer: req.params.singer
    });
    res.render('list', { songs, count: songs.length });
};

// Delete a Song
exports.deleteSong = async (req, res) => {
    await Song.deleteOne({ Songname: req.params.songname });
    res.send(`Deleted song: ${req.params.songname}`);
};

// Add a new Favourite Song
exports.addFavouriteSong = async (req, res) => {
    const newSong = new Song({
        Songname: 'NewFavSong',
        Film: 'NewFilm',
        Music_director: 'NewDirector',
        Singer: 'NewSinger'
    });
    await newSong.save();
    res.send('New favourite song added!');
};

// List Songs by Singer and Film
exports.songsBySingerFilm = async (req, res) => {
    const songs = await Song.find({
        Singer: req.params.singer,
        Film: req.params.film
    });
    res.render('list', { songs, count: songs.length });
};

// Update Song with Actor and Actress
exports.addActorActress = async (req, res) => {
    await Song.updateOne({ Songname: req.params.songname }, {
        Actor: 'Sample Actor',
        Actress: 'Sample Actress'
    });
    res.send(`Updated song ${req.params.songname} with Actor and Actress`);
};
