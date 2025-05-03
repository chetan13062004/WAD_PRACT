const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  songname: String,
  film: String,
  musicdirector: String,
  singer: String,
  actor: String,
  actress: String
});

module.exports = mongoose.model("song", songSchema);
