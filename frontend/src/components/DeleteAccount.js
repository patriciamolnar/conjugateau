import { useState } from "react";
import { handleSubmit } from '../lib/fetch';
import { isEmpty } from "../lib/functions";
import ToggleVisibility from "./ToggleVisibility";

function DeleteAccount({ setLogin, setDeleted }) {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const deleteAccount = (e) => {
        e.preventDefault(); 

        if(isEmpty(password)) { //check if password is filled out
            setMessage('Please fill in your password'); 
            return; 
        }

        setLoading(true);

        const obj = {
            uri: '/user/delete-account/', 
            method: 'DELETE',
            details: { password }
        }

        //send request to DB
        handleSubmit(obj).then(data => {
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

    if(loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h4>Delete your account</h4>
            <p className="false">{message && message}</p>
            <form onSubmit={(e) => deleteAccount(e)}>
                <label htmlFor="delete-password">Confirm password to delete:</label>
                <input type={showPass ? "text" : "password"} id="delete-password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"/>
                <ToggleVisibility id="delete-account" showPass={showPass} setShowPass={setShowPass}/>
                <br />
                <button type="submit">Delete</button>
            </form>
        </div>
    )
}

export default DeleteAccount;