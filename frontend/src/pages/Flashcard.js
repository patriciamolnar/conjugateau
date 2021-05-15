import { useState } from 'react'
import FlashcardQuiz from '../components/FlashcardQuiz';
import TenseSelector from '../components/TenseSelector';

function Flashcard({ verbs, practicing, updateOptions, startGame, finishPractice, login }) {
    const [number, setNumber] = useState(0);

    if(!practicing) { //if tenses have not been selected display select page.
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
            } else { //if all questions were answered start from beginning.
                setNumber(0);
            }
        }

        return(
            <>  
                <FlashcardQuiz data={verbs[number]} getNext={getNext} login={login}/>
                <button onClick={() => {
                    setNumber(0);
                    finishPractice(); 
                }}>Finish Practicing</button>
            </>
        )
    }
    
}

export default Flashcard;