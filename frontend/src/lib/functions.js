export const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
  
      // swap elements array[i] and array[j]
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array; 
}

export const getUnique = (arr, key) => {
    return [...new Set(arr.map(item => item[key]))];
}

export const filterData = (arr, key) => {
  // const unique = [...new Set(arr.map(item => item[key]))];
  const unique = getUnique(arr, key);

  const filtered = [];
  
  unique.forEach(ele => {
      let newArr = arr.filter(obj => obj[key] === ele);
      filtered.push(newArr);
  });
  
  return filtered; 
}
