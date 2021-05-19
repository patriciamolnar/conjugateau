import { useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 

function ResetPassword() {
    const [password, setPassword] = useState(''); 
    const [message, setMessage] = useState(null); 
    const {token} = useParams();

    const changePassword = (e) => {
        e.preventDefault(); 
        fetch('/user/reset/' + token, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({password})
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    setMessage(data.message);
                    setPassword(''); 
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
           <h2>Reset Your Password</h2>
           <p>Please enter your new password below:</p>
           <p>
                {message ? message : null}
                {message === 'Password successfully changed.' ? 
                <Link to="/account">Please login</Link> : null}
            </p>
           <form onSubmit={(e) => changePassword(e)}>
               <label htmlFor="password">Password:</label>
               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password"/>
               <button type="submit">Change</button>
           </form>
       </div>
    )
}

export default ResetPassword; 