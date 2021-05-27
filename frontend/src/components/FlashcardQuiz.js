import { useState, useCallback } from 'react';
import { getStyle, updateStarred } from '../lib/functions';
import StarIcon from './StarIcon';  

function FlashcardQuiz({ data, getNext, login, starred, setStarred }) {
    const [hidden, setHidden] = useState(true);

    //focus on next btn 
    const focusNext = useCallback(node => {
        if(node !== null) {
            node.focus();
        }
    }, []);

    let style = 'star'; 
    if(login && starred !== null) {
        style += getStyle(starred, data._id);
    }

    return(
        <div className="quizcard">
            <p className="infinitive">
                {data.infinitive} 
                {login && 
                <span onClick={() => {updateStarred(data._id, setStarred)}}>
                    <StarIcon styling={style} />
                </span>}
            </p>
            <p className="translation">{data.en}</p>
            <p className="tense">{data.tense}</p>
            <p className="pronoun">{data.pronoun}</p>
            
            <p onClick={() => setHidden(false)}>
                {hidden ? 
                <span className="tap-to-see">Tap to see answer</span> :
                <span className="flashcard-result">{data.conjugation}</span>}
            </p>
            {!hidden ? <button ref={focusNext} onClick={() => {
                setHidden(true); 
                getNext();
            }}>Next</button>: 
            null}
        </div>
    )
}

export default FlashcardQuiz;