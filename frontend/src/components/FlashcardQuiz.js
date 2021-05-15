import { useState } from 'react';
import { saveVerb } from '../lib/fetch';

function FlashcardQuiz({ data, getNext, login }) {
    const [hidden, setHidden] = useState(true);

    return(
        <div>
            {login ? <button onClick={() => {saveVerb({_id: data._id})}}>*</button> : null}
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