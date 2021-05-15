import { useState } from 'react';
import { saveVerb } from '../lib/fetch';

function TestQuiz({ data, getNext, login, setStarred }) {
    const [answered, setAnswered] = useState(false);
    const [input, setInput] = useState('');
    const [correct, setCorrect] = useState(null);

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

    return(
        <div>
            {login ? <button onClick={() => {updateStarred(data._id)}}>*</button> : null}
            <p>{data.infinitive} <span>({data.en})</span></p>
            <p>{data.tense}</p>
            <p>{data.pronoun}</p>
            
            <form onSubmit={(e) => validateAnswer(e)}>
                <input type="text" onChange={(e) => setInput(e.target.value)} disabled={answered}/>
                {answered ? null : <button>Check Answer</button>}
            </form>
            
            {correct ? <p>Correct!</p> : null}
            {correct === false ? <p>False: The correct conjugation is {data.conjugation}</p> : null}

            {answered ? <button onClick={() => {
                setInput('');
                setAnswered(false);
                setCorrect(null);
                getNext();
            }}>Next</button> : null}
        </div>
    )
}

export default TestQuiz;