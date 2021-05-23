import { useState } from 'react'; 
import { NavLink } from 'react-router-dom';
import TestQuiz from '../components/TestQuiz';
import TenseSelector from '../components/TenseSelector';
import { getNext } from '../lib/functions';

function Test({ verbs, practicing, updateOptions, startGame, finishPractice, login, setStarred, starred }) {
    const [number, setNumber] = useState(0);

    //if tenses have not been selected display select page.
    if(!practicing) { //if tenses have not been selected display select page.
        return (
            <>  
                <NavLink exact to="/test" activeClassName="active">Practice All Words</NavLink> | 
                <NavLink to="/starred-test" activeClassName="active">Practice Saved Words</NavLink>
                <h2>Test Yourself</h2>
                <TenseSelector updateOptions={updateOptions} startGame={startGame} />
            </>
        )

    } else if(verbs === null) { // wait for data to load 
        return (
            <div>Loading...</div>
        )

    } else { // start praciting
        return(
            <>  
                <p>Count: {number + 1}/{verbs.length}</p>
                <TestQuiz 
                    data={verbs[number]} 
                    getNext={() => setNumber(getNext(number, verbs))} 
                    login={login} 
                    setStarred={setStarred} 
                    starred={starred}/>
                <button onClick={() => {
                    setNumber(0);
                    finishPractice(); 
                }}>Finish Practicing</button>
            </>
        )
    }
    
}

export default Test;