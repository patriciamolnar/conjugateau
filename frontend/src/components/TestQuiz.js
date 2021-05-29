import { useCallback, useRef, useState, useEffect } from 'react';
import { formatInput, getStyle, updateStarred } from '../lib/functions';
import StarIcon from './StarIcon';  

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
        if(data.conjugation === formatInput(input)) {
            setCorrect(true);
        } else {
            setCorrect(false);
        } 
    }

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
            
            <form onSubmit={(e) => validateAnswer(e)}>
                <label htmlFor="test-input">Please type the correct conjugation below:</label>
                <input type="text" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} id="test-input" disabled={answered} />
                {answered ? null : <button>Check Answer</button>}
            </form>
            
            {correct ? <p className="test-answer correct">Correct!</p> : null}
            {correct === false ? <p className="test-answer"><span className="false">False</span>: The correct conjugation is <span className="test-solution">{data.conjugation}</span></p> : null}

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