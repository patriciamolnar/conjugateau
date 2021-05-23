import { Fragment, useEffect, useState } from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route,
  NavLink, 
  Redirect
} from 'react-router-dom';

import Flashcard from './pages/Flashcard';
import StarredFlashcard from './pages/StarredFlashcard';
import Test from './pages/Test';
import StarredTest from './pages/StarredTest';
import Verbs from './pages/Verbs';
import Account from './pages/Account';
import Header from './components/Header';
import ForgottenPassword from './pages/ForgottenPassword';
import ResetPassword from './pages/ResetPassword';

import { getByTense, getSavedVerbs } from './lib/fetch';

function App() {
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [starred, setStarred] = useState(null);
  const [selected, setSelected] = useState([]);
  const [practicing, setPracticing] = useState(false);
  const [login, setLogin] = useState(false); 

  //check if user is already logged in.
  useEffect(() => {
    if(login) return; 
    
    fetch('/user/auth')
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
          return JSON.stringify({isAuthenticated: false});
      }
    }).then(data => {
      if(data.isAuthenticated) {
        setLogin(true);
        getSavedVerbs(setStarred);
      }
    });
  
  }, [login]); 

  //whenever user stars/unstars a word, update filteredData
  useEffect(() => {
    if(starred === null || selected.length === 0) return; 

    let filtered = starred.filter(obj => {
      return obj['tense'].includes(selected);
    }); 
    
    setFilterData(filtered);
  }, [starred, selected]);

  //save tenses selected to state
  const updateOptions = (e) => {
    setSelected([...selected, e.target.name]);
  }

  //start game and filter data based on tenses selected
  const startGame = () => {
    const queryStr = selected.join('+');
    getByTense(queryStr, setData);
    setPracticing(true);
  }

  //start game and filter starred verbs based on tenses selected 
  const filterStarred = () => {
    let filtered = starred.filter(obj => {
      return obj['tense'].includes(selected);
    }); 
    
    setFilterData(filtered);
    setPracticing(true);
}

  const finishPractice = () => {
    setFilterData(null);
    setData(null);
    setSelected([]);
    setPracticing(false);
  }

  return (
    <Fragment>
      <Router>
        <Header />
        <nav>
          <ul>
            <li>
              <NavLink to="/" activeClassName="active" onClick={finishPractice}>Flashcards</NavLink>
            </li>
            <li>
              <NavLink to="/test" activeClassName="active" onClick={finishPractice}>Test</NavLink>
            </li>
            <li>
              <NavLink to="/verbs" activeClassName="active" onClick={finishPractice}>Verbs</NavLink>
            </li>
            <li>
              <NavLink to="/account" activeClassName="active" onClick={finishPractice}>Account</NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
           {/* Flashcard page - can be used without login */}
          <Route exact path="/" render={(props) => {
            return <Flashcard {...props} verbs={data} practicing={practicing} updateOptions={updateOptions} startGame={startGame} finishPractice={finishPractice} login={login} starred={starred} setStarred={setStarred}/>
          }} />

          {/* Flashcards with only bookmarked verbs */}
          <Route path="/starred" render={(props) => {
            if(!login) {
              return <Redirect to="/account" />
            } else {
              return <StarredFlashcard {...props} verbs={filterData} practicing={practicing} setPracticing={setPracticing} starred={starred} setStarred={setStarred} selected={selected} setSelected={setSelected} updateOptions={updateOptions} startGame={filterStarred} finishPractice={finishPractice} login={login}/>
            } 
          }} />
          
          {/* Test page - can be used without login */}
          <Route path="/test" render={(props) => {
            return <Test {...props} verbs={data} practicing={practicing} updateOptions={updateOptions} startGame={startGame} finishPractice={finishPractice} login={login} starred={starred} setStarred={setStarred}/>
          }} />
          
          {/*Test with only bookmarked verbs*/ }
          <Route path="/starred-test" render={(props) => {
            if(!login) {
              return <Redirect to="/account" />
            } else {
              return <StarredTest {...props} verbs={filterData} practicing={practicing} setPracticing={setPracticing} starred={starred} setStarred={setStarred} selected={selected} setSelected={setSelected} updateOptions={updateOptions} startGame={filterStarred} finishPractice={finishPractice} login={login}/>
            } 
          }} />

           {/* Page showing conjugation tables for all words in DB */}
          <Route path="/verbs" render={(props) => {
            return <Verbs {...props} login={login} starred={starred} setStarred={setStarred} />
          }} />

          {/* Forgotten password route: only accessible if not logged in */}
          <Route path="/forgotten-password" render={(props) => {
            if(login) {
              return <Redirect to="/account" />
            } else {
              return <ForgottenPassword {...props} />
            }}}/>

          {/* Reset password route: only accessible if not logged in */}
          <Route path="/reset/:token" render={(props) => {
            if(login) {
              return <Redirect to="/account" />
            } else {
              return <ResetPassword {...props} />
            }}}/>

          {/* 
          Login, Register page (if logged out) - 
          Account settings page (if logged in)
          */}
          <Route path="/account" render={(props) => {
            return <Account {...props} login={login} setLogin={setLogin} setStarred={setStarred}/>
          }} />  
        </Switch>

      </Router>
    </Fragment>
  );
}

export default App;
