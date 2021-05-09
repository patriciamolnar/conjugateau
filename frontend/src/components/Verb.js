import { filterData } from '../lib/functions';

function Verb({data}) {
    const tenses = filterData(data, 'tense');
    
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
                                        return (
                                            <p key={ele._id}>
                                                <p>{(i === 0) ? ele.tense : null}</p>
                                                <span>{ele.pronoun}: </span>
                                                <span>{ele.conjugation}</span>
                                            </p>
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