import { Fragment } from 'react';
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
            <Route path="/" component={Flashcard} exact />
            <Route path="/test" component={Test} />
            <Route path="/verbs" component={Verbs} />
            <Route path="/account" component={Account} />  
          </Switch>

      </Router>
    </Fragment>
  );
}

export default App;
