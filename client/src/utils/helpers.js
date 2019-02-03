export default {
  abbreviateNumber:  value => {
    //if (value === 0){
      //return "No Data Found";
    //} else {
      return value > 999999 ? (value/1000000).toFixed(2) + 'm' : (value > 999 ? (value/1000).toFixed(2) + "k" : value)
    //}
  },
  msToTime: ms => {
    let hours = (((ms / 1000) / 60) / 60 );
    return hours;
  },
  artistSearch: (dbArray, artistName) => {
    for (let i = 0; i < dbArray.length; i++) {
      if (dbArray[i].name === artistName) {
        return dbArray[i]._id;
      } 
    }
    return false;
  }
}