console.log('Last.FM Keys Loaded');
console.log(process.env.REACT_APP_LASTFM_ID);

exports.lastFM = {
  "api_key": process.env.REACT_APP_LASTFM_ID,
};