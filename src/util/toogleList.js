function toogleListBy_id(arr, item) {
  return isItemBy_id(arr, item)
    ? arr.filter((i) => i._id !== item._id)
    : [...arr, item];
}

function isItemBy_id(arr, item) {
  return arr.filter((i) => i._id === item._id).length !== 0;
}

export { toogleListBy_id, isItemBy_id };
