import { useState } from "react";
import { useInput } from '../lib/customHooks';
import { getSavedVerbs } from '../lib/fetch';

function EmailPasswordForm({ title, id, url, method, btnText, setLogin, setStarred }) {
    const [emailProps, resetEmail] = useInput(''); 
    const [passwordProps, resetPassword] = useInput('')
    const [message, setMessage] = useState(null);
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false)

    const options = {
        method: method,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
                email: emailProps.value, 
                password: passwordProps.value
        })
    
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(url, options)
            .then(res => {
                if(res.ok) return res.json(); 
                else { // if login is unauthorised  
                    return JSON.stringify({success: false});
                }
            })
            .then(data => {
                resetPassword();
                setLoading(false);

                if(data.success) {
                    resetEmail(); 
                    setMessage(data.message);

                    //if login form: get verbs from DB and save to state
                    if(id === 'login') { 
                        setLogin(true);
                        getSavedVerbs(setStarred);
                    }
                } else {
                    if(id === 'login') { //custom message when login fails
                        setMessage('Incorrect username or password.');
                    } else {
                        setMessage(data.message);
                    }
                } 
            })
            .catch(err => {
                setMessage('An error occured. Please try again later.');
            });
    }

    //display loading message while processing form
    if(loading) {
        return (
            <p>Loading...</p>
        )
    }

    //if user registers successfully hide register form and ask them to login
    if(id === 'register' && message === 'Account successfully created. Please log in.') {
        return (
            <p>{message}</p>
        )
    }

    return(
        <>
            <h2>{title}</h2>
            {message ? message : null}

            <form onSubmit={(e) => handleSubmit(e)}>

                <label htmlFor={id + 'email'}>Your new email</label>
                <input { ...emailProps } 
                    type="email" 
                    name="email" 
                    id={id + 'email'} 
                    autoComplete="email"/>

                <label htmlFor={id + 'password'}>Your password</label>
                <input { ...passwordProps }
                    type={showPass ? "text" : "password"} 
                    name="password"  
                    id={id + 'password'} 
                    autoComplete="current-password"/>

                <label htmlFor={id + 'toggle-password-visibility'}>
                    <input 
                        type="checkbox" 
                        id={id + 'toggle-password-visibility'} 
                        checked={showPass}
                        onChange={() => setShowPass(!showPass)}/>
                    Show password
                </label>

                <button type="submit">{btnText}</button>
            </form>
        </>
    )
}

export default EmailPasswordForm;