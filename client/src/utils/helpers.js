export default {
  abbreviateNumber: function (value) {
    const suffixes = ["", "k", "m", "b", "t"];
    const suffixNum = Math.floor(("" + value).length / 3);
    const shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
      const shortNum = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum];
  }
}