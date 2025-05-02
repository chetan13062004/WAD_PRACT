const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

router.get('/insert-songs', songController.insertSongs);
router.get('/list-songs', songController.listSongs);
router.get('/songs-by-director/:director', songController.songsByDirector);
router.get('/songs-by-director-singer/:director/:singer', songController.songsByDirectorSinger);
router.get('/delete-song/:songname', songController.deleteSong);
router.get('/add-song', songController.addFavouriteSong);
router.get('/songs-by-singer-film/:singer/:film', songController.songsBySingerFilm);
router.get('/add-actor-actress/:songname', songController.addActorActress);

module.exports = router;
