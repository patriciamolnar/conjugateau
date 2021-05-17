import { useState } from 'react'; 

import { getSavedVerbs } from '../lib/fetch';

function Loginform({ setLogin, setStarred }) {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState(null);

    const updateDetails = (e) => {
        const inputName = e.target.name; 
        const inputValue = e.target.value; 
        setUser(prevState => {
            return {...prevState, [inputName]: inputValue}
        });
    }

    const registerUser = (e) => {
        e.preventDefault(); 

        fetch('/user/login', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
            })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                } else {
                    return JSON.stringify({isAuthenticated: false});
                }
            })
            .then(data => {
                if(data.isAuthenticated) {
                    setLogin(true);
                    getSavedVerbs(setStarred); 
                } else {
                    setMessage('Incorrect username or password.');
                } 
            })
            .catch(err => {
                console.log(err); 
                setMessage('An error occured. Please try again later.');
            });
    }

    return(
        <>
            <h2>Login</h2>
            <p className="error">{message === null ? null : message}</p>
            <form onSubmit={(e) => registerUser(e)}>
                <label htmlFor="loginEmail">Email:</label>
                <input type="email" id="loginEmail" name="email"
                    value={user.email} autoComplete="email"
                    onChange={(e) => updateDetails(e)}/>
                <label htmlFor="loginPassword">Password:</label>
                <input type="password" id="loginPassword" name="password"
                    value={user.password} autoComplete="current-password"
                    onChange={(e) => updateDetails(e)}/>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Loginform;