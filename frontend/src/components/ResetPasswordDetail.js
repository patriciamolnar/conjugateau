import { useState } from 'react';
import { useInput } from '../lib/customHooks';
import { handleSubmit } from '../lib/fetch';
import ToggleVisibility from './ToggleVisibility';

function ResetPasswordDetail() {
    const [oldPassProps, resetOldPass] = useInput(''); 
    const [newPassProps, resetNewPass] = useInput('');
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [message, setMessage] = useState(null);

    const changePassword = (e) => {
        const obj = {
            uri: '/user/password/', 
            method: 'PUT',
            details: {
                oldPass: oldPassProps.value,
                newPass: newPassProps.value
            }
        }

        setLoading(true);

        handleSubmit(e, obj).then(data => {
            resetOldPass(); //resetting state and wih it the input fields.
            resetNewPass();
            setLoading(false);

            if(data.success) {
                setMessage(data.message);
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
        <div>
            <h2>Change your password:</h2>
            <p>{message && message}</p>
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

                <button type="submit">Change</button>
            </form>
        </div>
    )
}

export default ResetPasswordDetail;