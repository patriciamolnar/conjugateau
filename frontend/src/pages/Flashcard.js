import { useState } from 'react';
import FlashcardQuiz from '../components/FlashcardQuiz';
import TenseSelector from '../components/TenseSelector';
import Count from '../components/Count';
import Loading from '../components/Loading';
import { getNext } from '../lib/functions';
import SecondaryNav from '../components/SecondaryNav';
import NoSavedWords from '../components/NoSavedWords';

function Flashcard({
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

    //if the starred array is empty  
    if(starred.length === 0 && practiceSaved === true) {
      return (
        <NoSavedWords url="/" setPractiveSaved={setPractiveSaved} />
      )
    }
    

    if(!practicing || practicing === 'empty') { //if tenses have not been selected display select page.
        return (
            <main> 
                <SecondaryNav 
                    practiceSaved={practiceSaved} 
                    setPractiveSaved={setPractiveSaved}
                />
                <h2>
                Flashcards: 
                {practiceSaved ? 
                    ' Practice your saved words': 
                    ' Practice all words'}
                </h2>
                {practicing === 'empty' && 
                <p className="false default">Please select at least 1 tense to start.</p> }
                <TenseSelector updateOptions={updateOptions} startGame={startGame} />
            </main>
        )

        // display loading until data is ready
    } else if(verbs === null) {  
        return <Loading />;
        
    } // if filtering results in empty array show error msg
     else if(verbs.length === 0) {
        return (
            <main className="default">
                <div>No starred conjugations for the tenses selected.</div>
                <button onClick={() => {
                    setNumber(0);
                    finishPractice(); 
                }}>Go back</button>
            </main>
    )  
    
    // start praciting
    } else { 
      return(
        <main>  
          <Count num={number + 1} length={verbs.length}/>
          <div className="default">
            <FlashcardQuiz 
                data={verbs[number]} 
                getNext={() => setNumber(getNext(number, verbs))} 
                login={login} 
                starred={starred} 
                setStarred={setStarred}/>
          </div>
        </main>
      )
    } 
}

export default Flashcard;