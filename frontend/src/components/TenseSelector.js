function TenseSelector({ updateOptions, startGame }) { 
    const tenseNames = ['present-indicative', 'imparfait'];

    return(
        <div className="tense-selector">
            <p>Select tenses to practice:</p>
            {tenseNames.map(name => {
                return( 
                    <label htmlFor={name}>
                        <input id={name} name={name} type="checkbox" onClick={(e) => updateOptions(e.target.name)}/>
                        {name}
                    </label>
                )
            })}
            <button onClick={startGame}>Start</button>
        </div>
    )
}

export default TenseSelector; 