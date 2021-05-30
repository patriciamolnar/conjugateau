import { filterData } from '../lib/functions';
import Loading from '../components/Loading';
import StarIcon from './StarIcon';

function Verb({data, login, starred, setStarred}) {
    const tenses = filterData(data, 'tense');

    if(!tenses) {
        return <Loading />; 
    }
    
    return(
        <div className="conjugation">
            <h3 className="infinitive">{data[0].infinitive}</h3>
            <p className="translation">{data[0].en}</p>
            <p className="type">Type: {data[0].type}</p>
            
            <div className="conjugation-grid">
                {tenses.map((arr, i) => {
                    return (
                        <div className="conjugation-card" key={i.toString()}>
                            {arr.map((ele, i) => {
                                return (
                                    <div className="conjugation-card-verb" key={ele._id}>
                                        <p className="tense">{(i === 0) ? ele.tense : null}</p>
                                        <span className="pronoun">{ele.pronoun} </span>
                                        <span className="verb">{ele.conjugation}
                                        {login && 
                                        <StarIcon 
                                            login={login} 
                                            starred={starred}
                                            setStarred={setStarred}  
                                            id={ele._id}
                                        />}
                                        </span>
                                    </div>
                                )})
                            }
                        </div>
                    );
                })}
            </div>
        </div>
    ); 
}

export default Verb; 