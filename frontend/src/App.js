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
  const [selected, setSelected] = useState([]);
  const [practicing, setPracticing] = useState(false);

  //load data on first render
  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(setData)
      .catch(e => console.log(e))
  }, []);

  //filter data based on tenses user wants to practice
  const updateData = () => {
    if(selected.length > 0) {
      let filtered = data.map(obj => {
        let rObj = {}
        rObj['infinitive'] = obj.infinitive; 
        rObj['en'] = obj.en;
        rObj['tenses'] = obj['tenses'].filter(item => selected.includes(item['name']));
        return rObj
      }); 

      setData(filtered);
    } 
  }

  //save tenses selected to state
  const updateOptions = (e) => {
    setSelected([...selected, e.target.name]);
  }

  //start game and filter data
  const startGame = () => {
    updateData();
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
                return <Flashcard {...props} verbs={data} practicing={practicing} updateOptions={updateOptions} startGame={startGame} />
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
