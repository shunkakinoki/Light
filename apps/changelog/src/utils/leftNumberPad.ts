export const leftNumberPad = value => {
  var zeroes = new Array(4).join("0");
  return (zeroes + value).slice(-3);
};
