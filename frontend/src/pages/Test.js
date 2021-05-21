import { useState } from 'react'; 
import { NavLink } from 'react-router-dom';

import TestQuiz from '../components/TestQuiz';
import TenseSelector from '../components/TenseSelector';

function Test({ verbs, practicing, updateOptions, startGame, finishPractice, login, setStarred, starred }) {
    const [number, setNumber] = useState(0);

    const activeStyle = {
        backgroundColor: 'magenta'
    }

    //if tenses have not been selected display select page.
    if(!practicing) { //if tenses have not been selected display select page.
        return (
            <>  
                <NavLink exact to="/test" activeStyle={activeStyle}>Practice All Words</NavLink> | 
                <NavLink to="/starred-test" activeStyle={activeStyle}>Practice Saved Words</NavLink>
                <h2>Test Yourself</h2>
                <TenseSelector updateOptions={updateOptions} startGame={startGame} />
            </>
        )

    } else if(verbs === null) { // wait for data to load 
        return (
            <div>Loading...</div>
        )

    } else { // start praciting

        const getNext = () => {
            if(number < (verbs.length - 1)) {
                setNumber(number => number + 1);
            } else { //if all questions were practiced start again.
                setNumber(0);
            }
        }

        return(
            <>  
                <p>Practiced: {number}/{verbs.length}</p>
                <TestQuiz data={verbs[number]} getNext={getNext} login={login} setStarred={setStarred} starred={starred}/>
                <button onClick={() => {
                    setNumber(0);
                    finishPractice(); 
                }}>Finish Practicing</button>
            </>
        )
    }
    
}

export default Test;