import { useState } from 'react';

function TestQuiz({ data, getNext }) {
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
    return(
        <div>
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