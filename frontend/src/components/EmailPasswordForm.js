import { useState } from "react";
import { useInput } from '../lib/customHooks';
import { getSavedVerbs } from '../lib/fetch';
import { formatInput } from "../lib/functions";
import ToggleVisibility from "./ToggleVisibility";

function EmailPasswordForm({ title, id, url, method, btnText, setLogin, setStarred }) {
    const [emailProps, resetEmail] = useInput(''); 
    const [passwordProps, resetPassword] = useInput('')
    const [message, setMessage] = useState(null);
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const options = {
        method: method,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
                email: formatInput(emailProps.value), 
                password: passwordProps.value
        })
    
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null); 

        fetch(url, options)
            .then(res => {
                if(id === 'login') { // avoid errors if login is unauthorised
                    if(res.ok) return res.json(); 
                    else {  
                        return JSON.stringify({success: false});
                    }
                } else { // for non login requests, simply return json
                    return res.json(); 
                }    
            })
            .then(data => {
                console.log(data);
                resetPassword();
                setLoading(false);

                if(data.success) {
                    resetEmail(); 
                    setMessage(data.message);
                    setSuccess(data.success);

                    //if login form: get verbs from DB and save to state
                    if(id === 'login') { 
                        setLogin(true);
                        getSavedVerbs(setStarred);
                    }
                } else {
                    setSuccess(false);
                    if(id === 'login') { //custom message when login fails
                        setMessage('Incorrect username or password.');
                    } else {
                        setMessage(data.message);
                    }
                } 
            })
            .catch(err => {
                setSuccess(false);
                setMessage('An error occured. Please try again later.');
            });
    }

    //display loading message while processing form
    if(loading) {
        return <p>Loading...</p>;
    }

    //if user registers successfully hide register form and ask them to login
    if(id === 'register' && message === 'Account successfully created. Please log in.') {
        return (
            <p className="correct">{message}</p>
        )
    }

    return(
        <div>
            <h4>{title}</h4>
            {message && <p className={success ? 'correct' : 'false'}>{message}</p>}

            <form onSubmit={(e) => handleSubmit(e)}>

                <label htmlFor={id + 'email'}>
                    {id === 'change-email' ? 'Your new email' : 'Your email'}
                </label>
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
                <ToggleVisibility id={id} showPass={showPass} setShowPass={setShowPass} />
                <br />
                <button type="submit">{btnText}</button>
            </form>
        </div>
    )
}

export default EmailPasswordForm;