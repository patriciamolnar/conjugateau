import { filterData, getStyle } from '../lib/functions';
import { saveVerb } from '../lib/fetch';

function Verb({data, login, starred, setStarred}) {
    const tenses = filterData(data, 'tense');

    const updateStarred = (id) => {
        saveVerb({_id: id}, setStarred); 
    }
    
    if(tenses) {
        return(
            <div>
                <h3>{data[0].infinitive}</h3>
                <p>{data[0].en}</p>
                <p>{data[0].type}</p>
                
                <div>
                    {tenses.map((arr, i) => {
                        return (
                            <div key={i.toString()}>
                                {
                                    arr.map((ele, i) => {
                                        let style = null; 
                                        if(login && (starred !== null)) {
                                            style = getStyle(starred, ele._id);
                                        } 
                                        return (
                                            <div key={ele._id}>
                                                <p>{(i === 0) ? ele.tense : null}</p>
                                                <span>{ele.pronoun}: </span>
                                                <span>{ele.conjugation}</span>
                                                {login ? 
                                                <button 
                                                    onClick={() => {updateStarred(ele._id)}} 
                                                    style={style}>*</button> 
                                                : null}
                                            </div>
                                        )
                                    })
                                }
                                <hr />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}

export default Verb; 