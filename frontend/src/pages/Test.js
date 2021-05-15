import { useState } from 'react'
import TestQuiz from '../components/TestQuiz';

import TenseSelector from '../components/TenseSelector';

function Test({ verbs, practicing, updateOptions, startGame, finishPractice, login, setStarred }) {
    const [number, setNumber] = useState(0);

    //if tenses have not been selected display select page.
    if(!practicing) {
        return (
            <TenseSelector updateOptions={updateOptions} startGame={startGame} />   
        )

    } else if(verbs === null) { // wait for data to load 
        return (
            <div>Loading...</div>
        )

    } else { // start praciting

        const getNext = () => {
            if(number < (verbs.length - 1)) {
                setNumber(number => number + 1);
            } else { //if all questions were practiced start again.
                setNumber(0);
            }
        }

        return(
            <>  
                <TestQuiz data={verbs[number]} getNext={getNext} login={login} setStarred={setStarred}/>
                <button onClick={() => {
                    setNumber(0);
                    finishPractice(); 
                }}>Finish Practicing</button>
            </>
        )
    }
    
}

export default Test;