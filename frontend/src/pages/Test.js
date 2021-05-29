import { useState } from 'react';
import { Link } from 'react-router-dom';
import Count from '../components/Count';
import TestQuiz from '../components/TestQuiz';
import TenseSelector from '../components/TenseSelector';
import { getNext } from '../lib/functions';
import Loading from '../components/Loading';

function Test({
  verbs, 
  practicing, 
  updateOptions, 
  startGame, 
  finishPractice, 
  login, 
  starred, 
  setStarred, 
  practiceSaved,
  setPractiveSaved 
}) {
    const [number, setNumber] = useState(0);

    if(starred === 0) {
      if(starred.length === 0) {
        return (
          <div className="center">
              <p>You have no saved words yet.</p>
              <Link exact to="/test">Practice All Words</Link>
          </div>
        )
      }
    }

    if(!practicing) { //if tenses have not been selected display select page.
        return (
            <>  
                <div className="secondary-nav">
                  <button className={practiceSaved === false ? 'active' : ''} onClick={() => setPractiveSaved(false)}>All Words</button>
                  <button className={practiceSaved ? 'active' : ''} onClick={() => setPractiveSaved(true)}>Saved Words</button>
                </div>
                <h2>Practice with Flashcards</h2>
                <TenseSelector updateOptions={updateOptions} startGame={startGame} />
            </>
        )

        // display loading until data is ready
    } else if(verbs === null) {  
        return <Loading />;
        
    } // if filtering results in empty array show error msg
     else if(verbs.length === 0) {
        return (
            <>
                <div>No starred conjugations for the tenses selected.</div>
                <button onClick={() => {
                    setNumber(0);
                    finishPractice(); 
                }}>Go back</button>
            </>
    )  
    
    // start praciting
    } else { 
        return(
            <>  
                <Count num={number + 1} length={verbs.length}/>
                <TestQuiz 
                    data={verbs[number]} 
                    getNext={() => setNumber(getNext(number, verbs))} 
                    login={login} 
                    setStarred={setStarred} 
                    starred={starred}/>
                <button onClick={() => {
                    setNumber(0);
                    finishPractice(); 
                }} className="finish-practicing">Finish Practicing</button>
            </>
        )
    } 
}

export default Test;