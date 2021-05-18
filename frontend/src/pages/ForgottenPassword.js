import { useState } from "react";

function ForgottenPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const requestReset = (e) => {
        e.preventDefault(); 
        fetch('/user/forgotten-password', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email})
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    setMessage(data.message);
                    setEmail(''); 
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
        <h2>Reset your password</h2>
        <p>Please enter your email below.</p>
        {message ? message : null}
        <form onSubmit={(e) => requestReset(e)}>
            <label htmlFor="email"></label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" autoComplete="email"/>
            <button type="submit">Send</button>
        </form>
        </>
    )
}

export default ForgottenPassword; 