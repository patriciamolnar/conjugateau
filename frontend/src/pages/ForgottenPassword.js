import { useState } from "react";
import { useInput } from '../lib/customHooks';
import { handleSubmit } from '../lib/fetch';
import { formatInput, validateEmail } from "../lib/functions";
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

function ForgottenPassword() {
    const [emailProps, resetEmail] = useInput('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(null);

    const requestReset = (e) => {
        e.preventDefault(); 
        
        //check if email is empty or incorrect format. 
        if(!validateEmail(emailProps.value)) {
            setMessage('Please fill in a valid email');
            setSuccess(false);
            return;
        }

        setLoading(true); 
        
        const obj = {
            uri: '/user/forgotten-password', 
            method: 'POST',
            details: {email: formatInput(emailProps.value)}
        }
        
        handleSubmit(obj).then(data => {
            setLoading(false);
            if(data.success) {
                setMessage(data.message);
                setSuccess(true);
                resetEmail(); 
            } else {
                setMessage(data.message);
                setSuccess(false);
            } 
        })
        .catch(err => {
            setMessage('An error occured. Please try again later.');
            setSuccess(false);
        });
    }

    if(loading) {
        return <Loading />;
    }

    return(
        <main className="password">
            <h2>Reset your password</h2>
            <p>Please enter your email below. We will then send you an email with a password reset link.</p>
            {message && <p className={success ? 'correct' : 'false'}>{message}</p>}
            <form onSubmit={(e) => requestReset(e)}>
                <label htmlFor="reset-email"></label>
                <input {...emailProps}
                    type="email" 
                    id="reset-email" 
                    autoComplete="email"/>
                <button type="submit">Send</button>
            </form>

            <Link to="/account">Login or Register here</Link>
        </main>
    );
}

export default ForgottenPassword; 