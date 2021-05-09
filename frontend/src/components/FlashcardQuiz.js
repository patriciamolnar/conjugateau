import { useState } from 'react';

function FlashcardQuiz( {data, getNext} ) {
    const [hidden, setHidden] = useState(true);


    return(
        <div>
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