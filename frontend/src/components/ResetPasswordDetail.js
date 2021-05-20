import { useState } from "react";

function ResetPasswordDetail() {
    const [password, setPassword] = useState({
        newPass: '', 
        oldPass: ''
    });

    const [showPass, setShowPass] = useState(false);
    const [message, setMessage] = useState(null);

    const updateDetails = (e) => {
        const inputName = e.target.name; 
        const inputValue = e.target.value; 
        setPassword(prevState => {
            return {...prevState, [inputName]: inputValue}
        });
    }

    const changePassword = (e) => {
        e.preventDefault(); 
        fetch('/user/password/', {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(password)
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    setMessage(data.message);
                    setPassword({oldPass: '', newPass: ''}); 
                } else {
                    setMessage(data.message);
                } 
            })
            .catch(err => {
                setMessage('An error occured. Please try again later.');
            });
    }

    return(
        <div>
            <h2>Change your password:</h2>
            {message ? message : null}
            <form onSubmit={(e) => changePassword(e)}>
                <label htmlFor="password">Your old password:</label>
                <input type={showPass ? "text" : "password"} value={password.oldPass} name="oldPass" onChange={(e) => updateDetails(e)} autoComplete="current-password"/>
                <label htmlFor="password">Your new password:</label>
                <input type={showPass ? "text" : "password"} value={password.newPass} name="newPass" onChange={(e) => updateDetails(e)} autoComplete="new-password"/>
                <label htmlFor="toggle-password-visibility">
                    <input 
                        type="checkbox" 
                        id="toggle-password-visibility" 
                        checked={showPass}
                        onChange={() => setShowPass(!showPass)}/>
                    Show password
                </label>
                <button type="submit">Change</button>
            </form>
        </div>
    )
}

export default ResetPasswordDetail;