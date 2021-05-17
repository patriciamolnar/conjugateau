import { useCallback, useRef, useState, useEffect } from 'react';
import { saveVerb } from '../lib/fetch';
import { getStyle } from '../lib/functions';

function TestQuiz({ data, getNext, login, starred, setStarred }) {
    const [answered, setAnswered] = useState(false);
    const [input, setInput] = useState('');
    const [correct, setCorrect] = useState(null);

    //focus on input
    const inputRef = useRef(null);
    useEffect(() => {
        if (!answered) {
          inputRef.current.focus();
        }
      }, [answered]);

    //focus on next btn 
    const focusNext = useCallback(node => {
        if(node !== null) {
            node.focus();
        }
    }, []);

    const validateAnswer = (e) => {
        e.preventDefault();
        setAnswered(true);
        if(data.conjugation === input) {
            setCorrect(true);
        } else {
            setCorrect(false);
        } 
    }

    //let users bookmark verbforms and update starred array
    const updateStarred = (id) => {
        saveVerb({_id: id}, setStarred); 
    }

    let style = null; 
    if(login && starred !== null) {
        style = getStyle(starred, data._id);
    }

    return(
        <div>
            {login ? 
            <button 
                onClick={() => {updateStarred(data._id)}} 
                style={style}>*</button> 
            : null}
            <p>{data.infinitive} <span>({data.en})</span></p>
            <p>{data.tense}</p>
            <p>{data.pronoun}</p>
            
            <form onSubmit={(e) => validateAnswer(e)}>
                <input type="text" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} disabled={answered} />
                {answered ? null : <button>Check Answer</button>}
            </form>
            
            {correct ? <p>Correct!</p> : null}
            {correct === false ? <p>False: The correct conjugation is {data.conjugation}</p> : null}

            {answered ? <button ref={focusNext} onClick={() => {
                setInput('');
                setAnswered(false);
                setCorrect(null);
                getNext();
            }}>Next</button> : null}
        </div>
    )
}

export default TestQuiz;