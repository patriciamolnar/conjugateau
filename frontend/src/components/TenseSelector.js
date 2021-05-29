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
        <div className="tense-selector">
            <p>Select tenses to practice:</p>
            <form>
                {tenseNames.map(name => {
                    return( 
                        <label htmlFor={name} key={name}>
                            <input id={name} name={name} type="checkbox" onClick={(e) => updateOptions(e.target.name)}/>
                            {name}
                        </label>
                    )
                })}
                <br />
                <button type="button" onClick={startGame}>Start</button>
            </form>
        </div>
    )
}

export default TenseSelector; 