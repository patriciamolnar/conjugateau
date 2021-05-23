import { useState } from "react";
import { handleSubmit } from '../lib/fetch';
import ToggleVisibility from "./ToggleVisibility";

function DeleteAccount({ setLogin, setDeleted }) {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const deleteAccount = (e) => {
        const obj = {
            uri: '/user/delete-account/', 
            method: 'DELETE',
            details: { password }
        }

        setLoading(true); 

        handleSubmit(e, obj).then(data => {
            setLoading(false); 

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

    loading && <p>Loading ...</p>

    return (
        <div>
            <h2>Delete your account</h2>
            <p>{message && message}</p>
            <form onSubmit={(e) => deleteAccount(e)}>
                <label htmlFor="delete-password">Confirm password to delete:</label>
                <input type={showPass ? "text" : "password"} id="delete-password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"/>
                <button type="submit">Delete</button>

                <ToggleVisibility id="delete-account" showPass={showPass} setShowPass={setShowPass}/>
            </form>
        </div>
    )
}

export default DeleteAccount;