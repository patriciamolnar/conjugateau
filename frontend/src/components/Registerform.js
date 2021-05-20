import { useState } from 'react'; 

function Registerform() {
    const [user, setUser] = useState({ 
        email: '',
        password: ''
    });
    const [showPass, setShowPass] = useState(false);
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

        fetch('/user/register', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
            })
            .then((result) => result.json())
            .then((info) => {
                if(info.success) {
                    setUser({email: '', password: ''});
                    setMessage('success');
                } else {
                    setMessage(info.messages);
                }
            })
    }

    return(
        <>
            {(message === null) ? 
            <>  
                <h2>Sign Up</h2>
                <form onSubmit={(e) => registerUser(e)}>
                    <label htmlFor="registerEmail">Email:</label>
                    <input type="email" id="registerEmail" name="email"
                        value={user.email} autoComplete="email"
                        onChange={(e) => updateDetails(e)}/>
                    <label htmlFor="registerPassword">Password:</label>
                    <input type={showPass ? "text" : "password"} id="registerPassword" name="password"
                        value={user.password} autoComplete="new-password"
                        onChange={(e) => updateDetails(e)}/>
                    <label htmlFor="toggle-password-visibility">
                        <input 
                            type="checkbox" 
                            id="toggle-password-visibility" 
                            checked={showPass}
                            onChange={() => setShowPass(!showPass)}/>
                        Show password
                    </label>
                    <button type="submit">Sign Up</button>
                </form>
            </> :
            (message === 'success') ?
            <p>Your account has been created successfully. Please login below.</p>: 
            <>  
                <p>{message}</p>
                <h2>Sign Up</h2>
                <form onSubmit={(e) => registerUser(e)}>
                    <label htmlFor="registerEmail">Email:</label>
                    <input type="email" id="registerEmail" name="email"
                        value={user.email} autoComplete="email"
                        onChange={(e) => updateDetails(e)}/>
                    <label htmlFor="registerPassword">Password:</label>
                    <input type={showPass ? "text" : "password"} id="registerPassword" name="password"
                        value={user.password} autoComplete="new-password"
                        onClick={(e) => updateDetails(e)}/>
                    <label htmlFor="toggle-password-visibility">
                        <input 
                            type="checkbox" 
                            id="toggle-password-visibility" 
                            checked={showPass}
                            onChange={() => setShowPass(!showPass)}/>
                        Show password
                    </label>
                    <button type="submit">Sign Up</button>
                </form>
            </>
            }
        </>
    )
}

export default Registerform;