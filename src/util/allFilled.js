function allFilled(arr) {
  return arr.filter((item) => !!item && item.length > 0).length === arr.length;
}

export default allFilled;
