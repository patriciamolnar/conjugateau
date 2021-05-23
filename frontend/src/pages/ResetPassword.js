import { useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { useInput } from '../lib/customHooks';
import { handleSubmit } from '../lib/fetch';
import ToggleVisibility from '../components/ToggleVisibility';

function ResetPassword() {
    const [passwordProps, resetPassword] = useInput(''); 
    const [message, setMessage] = useState(null); 
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const {token} = useParams();

    const changePassword = (e) => {
        setLoading(true);

        const obj = {
            uri: '/user/reset/' + token, 
            method: 'PUT',
            details: {
                password: passwordProps.value
            }
        }

        handleSubmit(e, obj).then(data => {
                setLoading(false);
                if(data.success) {
                    setMessage(data.message);
                    resetPassword(); 
                } else {
                    setMessage(data.message);
                } 
            })
            .catch(err => {
                setMessage('An error occured. Please try again later.');
            });
    }

    if(loading) {
        return <p>Loading...</p>
    }

    return(
       <div>
           <h2>Reset Your Password</h2>
           <p>Please enter your new password below:</p>
           <p>
                {message && message + ' '}
                {message === 'Password successfully changed.' && 
                <Link to="/account">Please login</Link>}
            </p>

           <form onSubmit={(e) => changePassword(e)}>
               <label htmlFor="reset-password">Password:</label>
               <input { ...passwordProps }
                    type={showPass ? "text" : "password"}   
                    id="reset-password"
                    autoComplete="new-password" />
               
               <ToggleVisibility id={"change-password2"} showPass={showPass} setShowPass={setShowPass} />
               <button type="submit">Change</button>
           </form>
       </div>
    )
}

export default ResetPassword; 