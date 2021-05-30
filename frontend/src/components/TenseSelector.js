import CheckBox from './CheckBox';

function TenseSelector({ updateOptions, startGame }) { 
    const tenseNames = [
        'present-indicative', 
        'imparfait', 
        'future', 
        'present-conditional', 
        'passé-composé', 
        'pluperfect',
        'future-perfect',
        'past-conditional',
        'present-subjunctive', 
        'past-subjunctive'
    ];

    return(
        <div className="tense-selector default">
            <p>Select tenses to practice:</p>
            <form>
                <div>
                {tenseNames.map(name => {
                    return( 
                        <CheckBox name={name} updateOptions={updateOptions}/>
                    )
                })}
                </div>
                <button type="button" onClick={startGame}>Start</button>
            </form>
        </div>
    )
}

export default TenseSelector; 