import { useState } from 'react';
import FlashcardNav from '../components/FlashcardNav';
import FlashcardQuiz from '../components/FlashcardQuiz';
import TenseSelector from '../components/TenseSelector';
import { getNext } from '../lib/functions';

function Flashcard({ verbs, practicing, updateOptions, startGame, finishPractice, login, starred, setStarred }) {
    const [number, setNumber] = useState(0);

    if(!practicing) { //if tenses have not been selected display select page.
        return (
            <>  
                <FlashcardNav />
                <TenseSelector updateOptions={updateOptions} startGame={startGame} />
            </>
        )

    } else if(verbs === null) { // wait for data to load 
        return (
            <div>Loading...</div>
        )

    } else { // start praciting
        return(
            <>  
                <p>Count: {number + 1}/{verbs.length}</p>
                <FlashcardQuiz 
                    data={verbs[number]} 
                    getNext={() => setNumber(getNext(number, verbs))} 
                    login={login} 
                    starred={starred} 
                    setStarred={setStarred}/>
                <button onClick={() => {
                    setNumber(0);
                    finishPractice(); 
                }}>Finish Practicing</button>
            </>
        )
    }
}

export default Flashcard;