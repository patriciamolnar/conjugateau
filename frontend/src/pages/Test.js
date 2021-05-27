import { useState } from 'react'; 
import TestQuiz from '../components/TestQuiz';
import Count from '../components/Count';
import TenseSelector from '../components/TenseSelector';
import SecondaryNav from '../components/SecondaryNav'; 
import { getNext } from '../lib/functions';
import Loading from '../components/Loading';

function Test({ verbs, practicing, updateOptions, startGame, finishPractice, login, setStarred, starred }) {
    const [number, setNumber] = useState(0);

    //if tenses have not been selected display select page.
    if(!practicing) { //if tenses have not been selected display select page.
        return (
            <>
                <SecondaryNav uri={"/test"} uriStarred={"/starred-test"} title={"Practice Test"} />
                <TenseSelector updateOptions={updateOptions} startGame={startGame} />
            </>
        )

    } else if(verbs === null) { // wait for data to load 
        return <Loading />

    } else { // start praciting
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

export default Test;