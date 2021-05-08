import { Fragment } from 'react';
import Verb from '../components/Verb';

function Verbs( {verbs} ) {
    return (
        <Fragment>
            <h2>Verbs</h2>
            {verbs.map(v => <Verb data={v} />)}
        </Fragment>
    )
}

export default Verbs;