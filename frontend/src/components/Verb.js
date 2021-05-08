import Table from './Table';

function Verb({data}) {
    return(
        <div>
            <h3>{data.infinitive}</h3>
            <p>{data.en}</p>
            <p>{data.type}</p>
            <div>
                {data['tenses'].map(tense => {
                    return (
                        <Table infinite={data.infinite} name={tense.name} verbs={tense.verbs} />
                    )
                })}
            </div>
            <hr />
        </div>
    )
}

export default Verb; 