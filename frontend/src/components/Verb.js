import { filterData, getStyle, updateStarred } from '../lib/functions';
import Loading from '../components/Loading';

function Verb({data, login, starred, setStarred}) {
    const tenses = filterData(data, 'tense');

    if(!tenses) {
        return <Loading />; 
    }
    
    return(
        <div>
            <h3>{data[0].infinitive}</h3>
            <p>{data[0].en}</p>
            <p>{data[0].type}</p>
            
            <div>
                {tenses.map((arr, i) => {
                    return (
                        <div key={i.toString()}>
                            {arr.map((ele, i) => {
                                let style = null; 
                                if(login && (starred !== null)) {
                                    style = getStyle(starred, ele._id);
                                } 
                                return (
                                    <div key={ele._id}>
                                        <p>{(i === 0) ? ele.tense : null}</p>
                                        <span>{ele.pronoun}: </span>
                                        <span>{ele.conjugation}</span>
                                        {login && <button 
                                            onClick={() => {updateStarred(ele._id, setStarred)}} 
                                            style={style}>*</button>}
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