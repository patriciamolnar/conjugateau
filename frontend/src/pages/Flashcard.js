import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FlashcardQuiz from '../components/FlashcardQuiz';
import TenseSelector from '../components/TenseSelector';

function Flashcard({ verbs, practicing, updateOptions, startGame, finishPractice, login, starred, setStarred }) {
    const [number, setNumber] = useState(0);

    const activeStyle = {
        backgroundColor: 'magenta'
    }

    if(!practicing) { //if tenses have not been selected display select page.
        return (
            <>  
                <NavLink exact to="/" activeStyle={activeStyle}>Practice All Words</NavLink> | 
                <NavLink to="/starred" activeStyle={activeStyle}>Practice Saved Words</NavLink>
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
            } else { //if all questions were answered start from beginning.
                setNumber(0);
            }
        }

        return(
            <>  
                <p>Practiced: {number}/{verbs.length}</p>
                <FlashcardQuiz data={verbs[number]} getNext={getNext} login={login} starred={starred} setStarred={setStarred}/>
                <button onClick={() => {
                    setNumber(0);
                    finishPractice(); 
                }}>Finish Practicing</button>
            </>
        )
    }
}

export default Flashcard;