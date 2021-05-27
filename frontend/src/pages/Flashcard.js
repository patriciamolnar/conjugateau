import { useState } from 'react';
import SecondaryNav from '../components/SecondaryNav';
import FlashcardQuiz from '../components/FlashcardQuiz';
import TenseSelector from '../components/TenseSelector';
import Count from '../components/Count';
import { getNext } from '../lib/functions';

function Flashcard({ verbs, practicing, updateOptions, startGame, finishPractice, login, starred, setStarred }) {
    const [number, setNumber] = useState(0);

    if(!practicing) { //if tenses have not been selected display select page.
        return (
            <>  
                <SecondaryNav uri={"/"} uriStarred={"/starred"} title={"Practice with Flashcards"} />
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
                <Count num={number + 1} length={verbs.length}/>
                <FlashcardQuiz 
                    data={verbs[number]} 
                    getNext={() => setNumber(getNext(number, verbs))} 
                    login={login} 
                    starred={starred} 
                    setStarred={setStarred}/>
                <button onClick={() => {
                    setNumber(0);
                    finishPractice(); 
                }} className="finish-practicing">Finish Practicing</button>
            </>
        )
    }
}

export default Flashcard;