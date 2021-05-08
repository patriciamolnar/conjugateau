import { Fragment, useState, useEffect } from 'react';
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

function App() {
  const [data, setData] = useState(null);
  const [tenses, setTenses] = useState([]);
  const [practicing, setPracticing] = useState(false);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(setData)
      .catch(e => console.log(e))
  }, []);

  const updateOptions = (e) => {
    setTenses([...tenses, e.target.name]);
  }

  const startGame = () => {
    setPracticing(true);
  }

  if(data === null) {
    return(
      <p>Loading....</p>
    )
  } else {
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
                return <Flashcard {...props} verbs={data} tenses={tenses} updateOptions={updateOptions} startGame={startGame} practicing={practicing}/>
              }} />
              <Route path="/test" component={Test} />
              
              <Route path="/verbs" render={(props) => <Verbs {...props} verbs={data} />} />

              <Route path="/account" component={Account} />  
            </Switch>

        </Router>
      </Fragment>
    );
  }
}

export default App;
