import { useState } from "react";

function ChangeEmail() {
    const [details, setDetails] = useState({
        email: '', 
        password: ''
    });

    const [message, setMessage] = useState(null);

    const updateDetails = (e) => {
        const inputName = e.target.name; 
        const inputValue = e.target.value; 
        setDetails(prevState => {
            return {...prevState, [inputName]: inputValue}
        });
    }

    const changeEmail = (e) => {
        e.preventDefault(); 
        fetch('/user/change-email/', {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(details)
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    setMessage(data.message);
                    setDetails({email: '', password: ''}); 
                } else {
                    setMessage(data.message);
                } 
            })
            .catch(err => {
                setMessage('An error occured. Please try again later.');
            });
    }

    return(
        <>
            <h2>Change Your Email</h2>
            {message ? message : null}
            <form onSubmit={(e) => changeEmail(e)}>
                <label htmlFor="email">Your new email</label>
                <input type="email" name="email" value={details.email} onChange={(e) => updateDetails(e)} id="email" autoComplete="email"/>
                <label htmlFor="password">Your password</label>
                <input type="password" name="password" value={details.password} onChange={(e) => updateDetails(e)} id="password" autoComplete="current-password"/>
                <button type="submit">Change</button>
            </form>
        </>
    )
}

export default ChangeEmail;