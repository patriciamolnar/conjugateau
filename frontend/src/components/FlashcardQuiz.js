import { useState, useCallback } from 'react';
import { getStyle, updateStarred } from '../lib/functions';

function FlashcardQuiz({ data, getNext, login, starred, setStarred }) {
    const [hidden, setHidden] = useState(true);

    //focus on next btn 
    const focusNext = useCallback(node => {
        if(node !== null) {
            node.focus();
        }
    }, []);

    let style = null; 
    if(login && starred !== null) {
        style = getStyle(starred, data._id);
    }

    return(
        <div>
            {login ? 
            <button onClick={() => {updateStarred(data._id, setStarred)}}
            style={style}>*</button> 
            : null}
            <p>{data.infinitive} <span>({data.en})</span></p>
            <p>{data.tense}</p>
            <p>{data.pronoun}</p>
            
            <p onClick={() => setHidden(false)}>
                {hidden ? 'Tap to see answer' : data.conjugation}
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