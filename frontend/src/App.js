import { Fragment, useEffect, useState } from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route,
  Link, 
  Redirect
} from 'react-router-dom';

import Flashcard from './pages/Flashcard';
import Test from './pages/Test';
import Verbs from './pages/Verbs';
import Account from './pages/Account';
import Header from './components/Header';

import { getByTense, getSavedVerbs } from './lib/fetch';

function App() {
  const [data, setData] = useState(null);
  const [starred, setStarred] = useState(null);
  const [selected, setSelected] = useState([]);
  const [practicing, setPracticing] = useState(false);
  const [login, setLogin] = useState(false); 

  useEffect(() => {
    if(login) return; 

    fetch('/user/auth')
    .then(res => res.json())
    .then(data => {
      if(data.isAuthenticated) {
        setLogin(true);
        getSavedVerbs(setStarred);
      }
    });
  }, []); 

  //save tenses selected to state
  const updateOptions = (e) => {
    setSelected([...selected, e.target.name]);
  }

  //start game and filter data
  const startGame = () => {
    const queryStr = selected.join('+');
    getByTense(queryStr, setData);
    setPracticing(true);
  }

  const finishPractice = () => {
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
                <Link to="/">Flashcards</Link>
              </li>
              <li>
                <Link to="/test">Test</Link>
              </li>
              <li>
                <Link to="/verbs">Verbs</Link>
              </li>
              <li>
                <Link to="/account">Account</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/" render={(props) => {
              return <Flashcard {...props} verbs={data} practicing={practicing} updateOptions={updateOptions} startGame={startGame} finishPractice={finishPractice} login={login} starred={starred} setStarred={setStarred}/>
            }} />

            {/* Flashcards with only bookmarked verbs */}
            <Route path="/starred" render={(props) => {
              if(!login) {
                return <Redirect to="/account" />
              } else {
                return <Flashcard {...props} verbs={starred} practicing={practicing} updateOptions={updateOptions} startGame={startGame} finishPractice={finishPractice} login={login} starred={starred} setStarred={setStarred}/>
              } 
            }} />
            
            <Route path="/test" render={(props) => {
              return <Test {...props} verbs={data} practicing={practicing} updateOptions={updateOptions} startGame={startGame} finishPractice={finishPractice} login={login} starred={starred} setStarred={setStarred}/>
            }} />
            
            {/*Test with only bookmarked verbs*/ }
            <Route path="/starred-test" render={(props) => {
              if(!login) {
                return <Redirect to="/account" />
              } else {
                return <Test {...props} verbs={starred} practicing={practicing} updateOptions={updateOptions} startGame={startGame} finishPractice={finishPractice} login={login} starred={starred} setStarred={setStarred}/>
              } 
            }} />

            <Route path="/verbs" component={Verbs} />

            <Route path="/account" render={(props) => {
              return <Account {...props} login={login} setLogin={setLogin} setStarred={setStarred}/>
            }} />  
          </Switch>

      </Router>
    </Fragment>
  );
}

export default App;
