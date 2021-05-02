import React, { Fragment, useState } from 'react'; 

function Registerform() {
    const [user, setUser] = useState({
        username: '', 
        email: '',
        password: ''
    });

    const updateDetails = (e) => {
        const inputName = e.target.name; 
        const inputValue = e.target.value; 
        setUser(prevState => {
            return {...prevState, [inputName]: inputValue}
        });
    }

    const registerUser = (e) => {
        e.preventDefault(); 

        fetch('/user/register', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
            })
            .then((result) => result.json())
            .then((info) => { console.log(info); })
    }

    return(
        <>
            <h1>Sign Up</h1>
            <form onSubmit={(e) => registerUser(e)}>
                <label htmlFor="registerUsername">Username:</label>
                <input type="text" id="registerUsername" name="username" 
                    value={user.username}
                    onChange={(e) => updateDetails(e)}/>
                <label htmlFor="registerEmail">Email:</label>
                <input type="email" id="registerEmail" name="email"
                    value={user.email}
                    onChange={(e) => updateDetails(e)}/>
                <label htmlFor="registerPassword">Password:</label>
                <input type="password" id="registerPassword" name="password"
                    value={user.password}
                    onChange={(e) => updateDetails(e)}/>
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}

export default Registerform;