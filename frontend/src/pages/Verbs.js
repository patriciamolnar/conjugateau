import { useEffect, useState } from 'react';
import Verb from '../components/Verb';
import { getAll, getByInfinitive } from '../lib/fetch';
import { filterData, formatInput } from '../lib/functions';
import Loading from '../components/Loading';

function Verbs({ login, starred, setStarred }) {
    const [info, setInfo] = useState(null);
    const [infinitives, setInfinitives] = useState(null);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [message, setMessage] = useState(null);
    
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
        setMessage(null);

        if(search === "") { //check if something was added to search form
            setMessage('Please enter an infinitive to search for.')
        } else {
            getByInfinitive(formatInput(search), setSearchResult);
        }
    }

    return (
        <>  
            <form className="search" onSubmit={(e) => {searchVerb(e)}}>
                <label htmlFor="search" className="sr-only">Search</label>
                <input type="search" id="search" value={search} onChange={(e) => {
                    setSearch(e.target.value); 
                    setSearchResult(null); 
                    }} placeholder="Search by infinite form..."/>
                <button type="submit">Submit</button>
            </form>

            {message && <p className="error">{message}</p>}

            {searchResult ? 
            <div>
                {searchResult ? 
                <button className="search-reset" onClick={() => {
                    setSearchResult(null); 
                    setSearch('');
                }}>Reset Search</button>: null}

                <p className="search-title">Result for {search}: </p>

                {searchResult.length === 0 ? 
                <p className="center">Could not find infinitive you are looking for in our database.</p>:
                <Verb data={searchResult} login={login} starred={starred} setStarred={setStarred}/>
                }
            </div> : 

            <>
                <h2>All Verbs</h2>
                {infinitives ? 
                infinitives.map((arr, i) => <Verb key={i.toString()} data={arr} login={login} starred={starred} setStarred={setStarred}/>) :
                <Loading />}
             </>
            }

           
            
        </>
    )
}

export default Verbs;