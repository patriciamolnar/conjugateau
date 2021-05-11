import { Fragment } from 'react';

function TenseSelector({ updateOptions, startGame }) {
    const tenseNames = ['present-indicative', 'imparfait'];

    return(
        <Fragment>
            <p>Select tenses to practice:</p>
            {tenseNames.map(name => {
                return( 
                    <label htmlFor={name}>
                        <input id={name} name={name} type="checkbox" onClick={(e) => updateOptions(e)}/>
                        {name}
                    </label>
                )
            })}
            <button onClick={startGame}>Start</button>
        </Fragment>
    )
}

export default TenseSelector; 