import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FlashcardQuiz from '../components/FlashcardQuiz';
import TenseSelector from '../components/TenseSelector';

function StarredFlashcard({ verbs, practicing, updateOptions, startGame, finishPractice, login, starred, setStarred }) {
    const [number, setNumber] = useState(0);

    const activeStyle = {
        backgroundColor: 'magenta'
    }

    if(starred.length === 0) {
        return (
            <>
                <p>You have no saved words yet.</p>
                <NavLink exact to="/" activeStyle={activeStyle}>Practice All Words</NavLink>
            </>
        )
    }

    if(!practicing) { //if tenses have not been selected display select page.
        return (
            <>  
                <NavLink exact to="/" activeStyle={activeStyle}>Practice All Words</NavLink> | 
                <NavLink to="/starred" activeStyle={activeStyle}>Practice Saved Words</NavLink>
                <TenseSelector updateOptions={updateOptions} startGame={startGame} />
            </>
        )

        // display loading until data is ready
    } else if(verbs === null) {  
        return (
            <div>Loading...</div>
        );
        
    } // if filtering results in empty array show error msg
     else if(verbs.length === 0) {
        return (
            <>
                <div>No starred conjugations for the tenses selected.</div>
                <button onClick={() => {
                    setNumber(0);
                    finishPractice(); 
                }}>Go back</button>
            </>
    )  
    
    // start praciting
    } else { 
        const getNext = () => {
            if(number < (verbs.length - 1)) {
                setNumber(number => number + 1);
            } else { //if all questions were answered start from beginning.
                setNumber(0);
            }
        }

        return(
            <>  
                <FlashcardQuiz data={verbs[number]} getNext={getNext} login={login} starred={starred} setStarred={setStarred}/>
                <button onClick={() => {
                    setNumber(0);
                    finishPractice(); 
                }}>Finish Practicing</button>
            </>
        )
    } 
}

export default StarredFlashcard;