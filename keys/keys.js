console.log('Spotify Keys Loaded');
console.log(process.env.REACT_APP_SPOTIFY_ID);

exports.spotify = {
  id: process.env.REACT_APP_SPOTIFY_ID,
  secret: process.env.REACT_APP_SPOTIFY_SECRET,
};