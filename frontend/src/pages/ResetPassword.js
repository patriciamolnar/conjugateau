import { useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { useInput } from '../lib/customHooks';
import { handleSubmit } from '../lib/fetch';
import ToggleVisibility from '../components/ToggleVisibility';
import Loading from '../components/Loading';
import { validatePassword } from '../lib/functions';

function ResetPassword() {
    const [passwordProps, resetPassword] = useInput(''); 
    const [message, setMessage] = useState(null); 
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const {token} = useParams();

    const changePassword = (e) => {
        e.preventDefault(); 

        //check if password has been filled out and has correct format
        if(!validatePassword(passwordProps.value)) {
            setMessage(
                'Incorrect password format: must contain at least 1 uppercase, 1 lowercase letter, 1 special character and 1 number. Minimum length must be 8.'
            );
            setSuccess(false);
            return;
        }

        setLoading(true);

        const obj = {
            uri: '/user/reset/' + token, 
            method: 'PUT',
            details: {
                password: passwordProps.value
            }
        }

        handleSubmit(obj).then(data => {
                setLoading(false);
                if(data.success) {
                    setSuccess(true);
                    setMessage(data.message);
                    resetPassword(); 
                } else {
                    setMessage(data.message);
                    setSuccess(false);
                } 
            })
            .catch(err => {
                setSuccess(false);
                setMessage('An error occured. Please try again later.');
            });
    }

    if(loading) {
        return <Loading />;
    }

    return(
       <main className="default">
           <h2>Reset Your Password</h2>
           <p>Please enter your new password below:</p>

           {message && 
           <>
              <p className={success ? 'correct' : 'false'}>{message + ' '}</p>
              {success && <Link to="/account">Please login</Link>}
           </>}
           

           {success !== true &&
           <form onSubmit={(e) => changePassword(e)}>
                <label htmlFor="reset-password">Password:</label>
                <input { ...passwordProps }
                        type={showPass ? "text" : "password"}   
                        id="reset-password"
                        autoComplete="new-password" />
                
                <ToggleVisibility id={"change-password2"} showPass={showPass} setShowPass={setShowPass} />
                <br />
                <button type="submit">Change</button>
            </form>}
       </main>
    )
}

export default ResetPassword; 