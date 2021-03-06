import { saveVerb } from '../lib/fetch';

const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i; 

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

//changing the order of the verbs in array to always be je > tu > il/elle etc.
export const changeOrder = (arr) => {
    let temp = []; 
    for(let i = 0; i < arr.length; i++) {
        let pronoun = arr[i]['pronoun'];
        if(pronoun === 'je' || pronoun === 'j\'' || pronoun === 'que  j\'' || pronoun === 'que  je' || pronoun === 'que je') {
            temp[0] = arr[i];
        } else if (pronoun === 'tu' || pronoun === 'que  tu' || pronoun === 'que tu') {
            temp[1] = arr[i];
        } else if (pronoun === 'il/elle/on' || pronoun === 'qu\'  il/elle/on' || pronoun === 'qu\' il/elle/on') {
            temp[2] = arr[i];
        } else if (pronoun === 'nous' || pronoun === 'que  nous' || pronoun === 'que nous') {
            temp[3] = arr[i];
        } else if (pronoun === 'vous' || pronoun === 'que  vous' || pronoun === 'que vous') {
            temp[4] = arr[i];
        } else if (pronoun === 'ils/elles' || pronoun === 'qu\'  ils/elles' || pronoun === 'qu\' ils/elles') {
            temp[5] = arr[i];
        }
    }

    return temp; 
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
export const updateStarred = (id, callback, updateStatus) => {
    saveVerb({_id: id}, callback, updateStatus); 
}

//convert str to lowercase and remove spaces from front & back
export const formatInput = str => str.trim().toLowerCase(); 

//check if input is empty
export const isEmpty = str => str.trim().length === 0;

//check email has correct format
export const checkFormatEmail = email => regexEmail.test(email); 

//check password has correct requirements
export const checkFormatPassword = (password) => {
    const uppercase = /[A-Z]/.test(password); 
    const lowercase = /[a-z]/.test(password);
    const number    = /[0-9]/.test(password);
    const special_char = /['^??$%&*()}{@#~?!><>,|=_+??.-]/.test(password);

    return uppercase && lowercase && number && special_char && password.length >= 8;
}

export const validateEmail = email => !isEmpty(email) && checkFormatEmail(email);

export const validatePassword = password => !isEmpty(password) && checkFormatPassword(password); 