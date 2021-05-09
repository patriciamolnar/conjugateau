import { Fragment, useState } from 'react'
import FlashcardQuiz from '../components/FlashcardQuiz';

function Flashcard({ verbs, practicing, updateOptions, startGame }) {
    const [number, setNumber] = useState(0);

    //if tenses have not been selected display select page.
    if(!practicing) {
        const tenseNames = ['present-indicative', 'imparfait'];
        return (
            <Fragment>
                <p>Select tenses to practice:</p>
                {tenseNames.map(name => {
                    return( 
                        <label htmlFor={name}>
                            <input id={name} name={name} type="checkbox" onClick={(e) => updateOptions(e)}/>
                            {name}
                        </label>
                    )
                })}
                <button onClick={startGame}>Start</button>
            </Fragment>
            
        )
    } else if(verbs === null) { // wait for data to load 
        return (
            <div>Loading...</div>
        )
    } else { // start praciting

        const getNext = () => {
            if(number < (verbs.length - 1)) {
                setNumber(number => number + 1);
            } 
        }

        return(
            <Fragment>  
                <FlashcardQuiz data={verbs[number]} getNext={getNext}/>
            </Fragment>
        )
    }
    
}

export default Flashcard;