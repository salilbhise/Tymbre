export default {
  abbreviateNumber:  value => {
    //if (value === 0){
      //return "No Data Found";
    //} else {
      return value > 999999 ? (value/1000000).toFixed(2) + 'm' : (value > 999 ? (value/1000).toFixed(2) + "k" : value)
    //}
  }
}