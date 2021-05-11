import { useEffect, useState } from 'react';
import Verb from '../components/Verb';
import { getAll } from '../lib/fetch';
import { filterData } from '../lib/functions';

function Verbs() {
    const [info, setInfo] = useState(null);
    const [infinitives, setInfinitives] = useState(null);
    
    //get all verbs from DB and assign it to all variable
    useEffect(() => {
        getAll(setInfo)
    }, []);

    // filter all unique infinitive forms into its own array
    useEffect(() => {
        if(info) {
            let arr = filterData(info, 'infinitive'); 
            setInfinitives(arr);
        }
    }, [info]); 

 
    return (
        <>
            <h2>Verbs</h2>
            {infinitives ? 
            infinitives.map((arr, i) => <Verb key={i.toString()} data={arr}/>) :
            <div>Loading...</div>}
        </>
    )
}

export default Verbs;