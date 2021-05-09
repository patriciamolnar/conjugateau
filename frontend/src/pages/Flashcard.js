import { Fragment } from 'react'
import FlashcardQuiz from '../components/FlashcardQuiz';

function Flashcard({ verbs, practicing, updateOptions, startGame }) {
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
    } else {    
        return(
            <Fragment>
                <h2>Starting Quiz</h2>   
                <FlashcardQuiz/>
            </Fragment>
        )
    }
    
}

export default Flashcard;