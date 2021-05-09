import { shuffle } from './functions';

//get all the verbs in the DB
export const getAll = (callback) => {
  fetch('/verbs/')
    .then(res => res.json())
    .then(data => callback(data)) 
}

//get data based on tenses
export const getByTense = (query, callback) => {
    fetch('/verbs/' + query)
      .then(res => res.json())
      .then(data => callback(shuffle(data)))
}

