import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Count from '../components/Count';
import SecondaryNav from '../components/SecondaryNav';
import TestQuiz from '../components/TestQuiz';
import TenseSelector from '../components/TenseSelector';
import { getNext } from '../lib/functions';

function StarredTest({ verbs, practicing, updateOptions, startGame, finishPractice, login, starred, setStarred }) {
    const [number, setNumber] = useState(0);

    const activeStyle = {
        backgroundColor: 'magenta'
    }

    if(starred.length === 0) {
        return (
            <>
                <p>You have no saved words yet.</p>
                <NavLink exact to="/test" activeStyle={activeStyle}>Practice All Words</NavLink>
            </>
        )
    }

    if(!practicing) { //if tenses have not been selected display select page.
        return (
            <>  
                 <SecondaryNav uri={"/test"} uriStarred={"/starred-test"} title={"Practice Test"} />
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
                <Count num={number + 1} length={verbs.length}/>
                <TestQuiz 
                    data={verbs[number]} 
                    getNext={() => setNumber(getNext(number, verbs))} 
                    login={login} 
                    setStarred={setStarred} 
                    starred={starred}/>
                <button onClick={() => {
                    setNumber(0);
                    finishPractice(); 
                }} className="finish-practicing">Finish Practicing</button>
            </>
        )
    } 
}

export default StarredTest;