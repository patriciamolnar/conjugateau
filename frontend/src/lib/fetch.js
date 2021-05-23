import { shuffle } from './functions';

//get all the verbs in the DB
export const getAll = (callback) => {
  fetch('/verbs/')
    .then(res => res.json())
    .then(data => callback(data)); 
}

//get data based on tenses
export const getByTense = (query, callback) => {
    fetch('/verbs/' + query)
      .then(res => res.json())
      .then(data => callback(shuffle(data)));
}

export const getByInfinitive = (query, callback) => {
  fetch('/verbs/search/' + query.trim().toLowerCase())
  .then(res => res.json())
  .then(data => callback(data));
}

export const saveVerb = (verb, callback) => {
  fetch('/user/saved/', {
    method: "PUT",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(verb)
    })
    .then((result) => result.json())
    .then(info => {
      if(info.saved) {
        getSavedVerbs(callback);
      }
    });
}

export const getSavedVerbs = (callback) => {
  fetch('/user/saved/')
      .then(res => res.json())
      .then(data => callback(shuffle(data)));
}

//call API with method POST, PUT, DELETE, ...
export const fetchWithParams = ({ uri, method, details }) => {
  const options = {
    method,
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(details)
  }

  return fetch(uri, options).then(res => res.json());
}

//prevent default and call API
export const handleSubmit = (e, obj) => {
  e.preventDefault(); 
  return fetchWithParams(obj);
}