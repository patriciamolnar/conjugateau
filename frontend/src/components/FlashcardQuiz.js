import { useState } from 'react';
import { saveVerb } from '../lib/fetch';

function FlashcardQuiz({ data, getNext, login, setStarred }) {
    const [hidden, setHidden] = useState(true);

    //let users bookmark verbforms and update starred array
    const updateStarred = (id) => {
        saveVerb({_id: id}, setStarred); 
    }

    return(
        <div>
            {login ? <button onClick={() => {updateStarred(data._id)}}>*</button> : null}
            <p>{data.infinitive} <span>({data.en})</span></p>
            <p>{data.tense}</p>
            <p>{data.pronoun}</p>
            
            <p onClick={() => setHidden(false)}>
                {hidden ? 'Tap to see answer' : data.conjugation}
            </p>

            {hidden ? null : <button onClick={() => {
                setHidden(true); 
                getNext();
            }}>Next</button>}
        </div>
    )
}

export default FlashcardQuiz;