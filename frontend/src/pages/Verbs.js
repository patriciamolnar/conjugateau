import { useEffect, useState } from 'react';
import Verb from '../components/Verb';
import { getAll, getByInfinitive } from '../lib/fetch';
import { filterData } from '../lib/functions';

function Verbs({ login, starred, setStarred }) {
    const [info, setInfo] = useState(null);
    const [infinitives, setInfinitives] = useState(null);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    
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

    const searchVerb = (e) => {
        e.preventDefault();
        getByInfinitive(search, setSearchResult);
    }

    return (
        <>  
            <form onSubmit={(e) => {searchVerb(e)}}>
                <label htmlFor="search">Search</label>
                <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <button type="submit">Submit</button>
                {searchResult ? 
                <button onClick={() => {
                    setSearchResult(null); 
                    setSearch('');
                }}>Reset</button>: null}
            </form>

            {}

            {searchResult ? 
            <div>
                <p>Result for {search}: </p>
                {searchResult.length === 0 ? 
                <p>Could not find infinitive you are looking for in our database.</p>:
                <Verb data={searchResult} login={login} starred={starred} setStarred={setStarred}/>
                }
            </div> : 

            <>
                <h2>Verbs</h2>
                {infinitives ? 
                infinitives.map((arr, i) => <Verb key={i.toString()} data={arr} login={login} starred={starred} setStarred={setStarred}/>) :
                <div>Loading...</div>}
             </>
            }

           
            
        </>
    )
}

export default Verbs;