import { Fragment, useState } from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route,
  Link
} from 'react-router-dom';

import Flashcard from './pages/Flashcard';
import Test from './pages/Test';
import Verbs from './pages/Verbs';
import Account from './pages/Account';
import Header from './components/Header';

import { getByTense } from './lib/fetch';

function App() {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState([]);
  const [practicing, setPracticing] = useState(false);

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
              return <Flashcard {...props} verbs={data} practicing={practicing} updateOptions={updateOptions} startGame={startGame} finishPractice={finishPractice}/>
            }} />
            
            <Route path="/test" render={(props) => {
              return <Test {...props} verbs={data} practicing={practicing} updateOptions={updateOptions} startGame={startGame} finishPractice={finishPractice}/>
            }} />
            
            <Route path="/verbs" component={Verbs} />

            <Route path="/account" component={Account} />  
          </Switch>

      </Router>
    </Fragment>
  );
}

export default App;
