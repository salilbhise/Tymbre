export default {
  abbreviateNumber: value => {
    //if (value === 0){
    //return "No Data Found";
    //} else {
    return value > 999999 ? (value / 1000000).toFixed(2) + 'm' : (value > 999 ? (value / 1000).toFixed(2) + "k" : value)
    //}
  },
  msToTime: ms => {
    let hours = (((ms / 1000) / 60) / 60);
    return hours;
  },
  artistSearch: (dbArray, artistName) => {
    for (let i = 0; i < dbArray.length; i++) {
      if (dbArray[i].name === artistName) {
        return dbArray[i]._id;
      }
    }
    return false;
  },
  timeSince: date => {
    let seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " Years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " Months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " Days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " Hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " Minutes";
    }
    return Math.floor(seconds) + " Seconds";
  },
  gainOrLoss: num => {
    if (num === 0) {
      return "(No Change)";
    } else if (num < 0) {
      return (`(-${num})`);
    } else {
      return (`(+${num})`);
    }
  },
  determineTymbreRating: (num1, num2, hours) => {
    console.log(num1, num2, hours);
    const delta = num2 - num1;
    const days = hours / 24;
    const growth = delta / days;
    if (num1 < 1000000 && num2 + (growth * 365) < 999999) {
      return 3;
    } else if (num1 < 1000000 && num2 + (growth * 365) > 999999) {
      return 2;
    } else {
      return 1;
    }
  }
}