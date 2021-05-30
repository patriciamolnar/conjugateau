import { useState, useCallback } from 'react';
import StarIcon from './StarIcon';  

function FlashcardQuiz({ data, getNext, login, starred, setStarred }) {
    const [hidden, setHidden] = useState(true);

    //focus on next btn 
    const focusNext = useCallback(node => {
        if(node !== null) {
            node.focus();
        }
    }, []);

    return(
        <div className="quizcard">
            <p className="infinitive">
                {data.infinitive} 
                {login && 
                <StarIcon 
                    login={login} 
                    starred={starred}
                    setStarred={setStarred}  
                    id={data._id}
                />}
            </p>
            <p className="translation">{data.en}</p>
            <p className="tense">{data.tense}</p>
            <p className="pronoun">{data.pronoun}</p>
            
            <p onClick={() => setHidden(false)} className="no-tap-highlight">
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