import { useState } from 'react';
import { useInput } from '../lib/customHooks';
import { handleSubmit } from '../lib/fetch';
import ToggleVisibility from './ToggleVisibility';
import { validatePassword } from '../lib/functions';

function ResetPasswordDetail() {
    const [oldPassProps, resetOldPass] = useInput(''); 
    const [newPassProps, resetNewPass] = useInput('');
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(null);

    const changePassword = (e) => {
        e.preventDefault(); 

        //check if password is empty || has incorrect format
        if(!validatePassword(newPassProps.value)) {
            setMessage(
                'Incorrect password format: must contain at least 1 uppercase, 1 lowercase letter, 1 special character and 1 number. Minimum length must be 8.'
            );
            setSuccess(false);
            return;
        }

        setLoading(true);
        
        const obj = {
            uri: '/user/password/', 
            method: 'PUT',
            details: {
                oldPass: oldPassProps.value,
                newPass: newPassProps.value
            }
        }

        handleSubmit(obj).then(data => {
            resetOldPass();
            resetNewPass();
            setLoading(false);
            setMessage(data.message); 
            setSuccess(data.success); 
        })
        .catch(err => {
            setSuccess(false);
            setMessage('An error occured. Please try again later.');
        });
    }

    if(loading) {
        return <p>Loading...</p>;
    }

    return(
        <div>
            <h4>Change your password</h4>
            {message && <p className={success ? 'correct' : 'false'}>{message}</p>}
            <form onSubmit={(e) => changePassword(e)}>

                <label htmlFor="old-password">Your old password:</label>
                <input { ...oldPassProps }
                    type={showPass ? "text" : "password"} 
                    id="old-password" 
                    name="old-password"
                    autoComplete="current-password"/>

                <label htmlFor="new-password">Your new password:</label>
                <input { ...newPassProps }
                    type={showPass ? "text" : "password"} 
                    id="new-password"
                    name="new-password" 
                    autoComplete="new-password"/>
                    
                <ToggleVisibility id={"change-password"} showPass={showPass} setShowPass={setShowPass} />
                <br />  
                <button type="submit">Change</button>
            </form>
        </div>
    )
}

export default ResetPasswordDetail;