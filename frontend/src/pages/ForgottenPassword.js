import { useState } from "react";
import { useInput } from '../lib/customHooks';
import { handleSubmit } from '../lib/fetch';
import { formatInput } from "../lib/functions";

function ForgottenPassword() {
    const [emailProps, resetEmail] = useInput('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const requestReset = (e) => {
        setLoading(true); 

        const obj = {
            uri: '/user/forgotten-password', 
            method: 'POST',
            details: {email: formatInput(emailProps.value)}
        }
        
        handleSubmit(e, obj).then(data => {
            setLoading(false);
            if(data.success) {
                setMessage(data.message);
                resetEmail(); 
            } else {
                setMessage(data.message);
            } 
        })
        .catch(err => {
            setMessage('An error occured. Please try again later.');
        });
    }

    if(loading) {
        return <p>Loading...</p>;
    }

    return(
        <>
        <h2>Reset your password</h2>
        <p>Please enter your email below.</p>
        {message && message}
        <form onSubmit={(e) => requestReset(e)}>
            <label htmlFor="reset-email"></label>
            <input {...emailProps}
                type="email" 
                id="reset-email" 
                autoComplete="email"/>
            <button type="submit">Send</button>
        </form>
        </>
    );
}

export default ForgottenPassword; 