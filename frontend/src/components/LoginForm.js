import { useState } from 'react'; 

function Loginform({ setLogin }) {
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

        fetch('/user/login', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
            })
            .then((result) => result.json())
            .then(data => {
                if(data.isAuthenticated) {
                    setLogin(true);
                } 
            })
            .catch(err => console.log(err))
    }

    return(
        <>
            <h2>Login</h2>
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