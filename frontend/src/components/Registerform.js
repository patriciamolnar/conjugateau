import { useState } from 'react'; 

function Registerform() {
    const [user, setUser] = useState({ 
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