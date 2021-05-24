import { saveVerb } from '../lib/fetch';

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

export const getStyle = (arr, id) => {
  let isIncluded = arr.find(o => o._id === id); 
    
  if(isIncluded) {
      return ' bookmarked';
  } else {
      return '';
  }
}

// return count of conjugations practiced.
export const getNext = (number, verbs) => {
    if(number < (verbs.length - 1)) {
        return number + 1
    } else { //if all questions were answered start from beginning.
        return 0
    }
}

// bookmark conjugations
export const updateStarred = (id, callback) => {
    saveVerb({_id: id}, callback); 
}

export const formatInput = (str) => str.trim().toLowerCase(); 