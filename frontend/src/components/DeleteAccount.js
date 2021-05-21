import { useState } from "react";

function DeleteAccount({ setLogin, setDeleted }) {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null); 

    const deleteAccount = (e) => {
        e.preventDefault(); 
        fetch('/user/delete-account/', {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({password})
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    setPassword('');
                    setDeleted(data.message);
                    setLogin(false);
                } else {
                    setMessage(data.message);
                } 
            })
            .catch(err => {
                setMessage('An error occured. Please try again later.');
            });
    }

    return (
        <div>
            <h2>Delete your account</h2>
            {message ? message : null}
            <form onSubmit={(e) => deleteAccount(e)}>
                <label htmlFor="delete-password">Confirm password to delete:</label>
                <input type="password" id="delete-password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"/>
                <button type="submit">Delete</button>
            </form>
        </div>
    )
}

export default DeleteAccount;