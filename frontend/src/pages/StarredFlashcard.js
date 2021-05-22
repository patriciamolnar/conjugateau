import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FlashcardQuiz from '../components/FlashcardQuiz';
import TenseSelector from '../components/TenseSelector';
import { getNext } from '../lib/functions';

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
                <h2>Saved Conjugations: Practice with Flashcards!</h2>
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
        return(
            <>  
                <p>Count: {number + 1}/{verbs.length}</p>
                <FlashcardQuiz 
                    data={verbs[number]} 
                    getNext={() => setNumber(getNext(number, verbs))} 
                    login={login} 
                    starred={starred} 
                    setStarred={setStarred}/>
                <button onClick={() => {
                    setNumber(0);
                    finishPractice(); 
                }}>Finish Practicing</button>
            </>
        )
    } 
}

export default StarredFlashcard;