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

export const saveVerb = (verb) => {
  fetch('/user/saved', {
    method: "PUT",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(verb)
    })
    .then((result) => result.json())
    .then((info) => { console.log(info); })
}

export const getSavedVerbs = (callback) => {
  fetch('/user/saved')
      .then(res => res.json())
      .then(data => callback(shuffle(data)));
}