import { Link } from 'react-router-dom';
import Logout from '../components/Logout'; 
import ResetPasswordDetail from '../components/ResetPasswordDetail'; 
import DeleteAccount from '../components/DeleteAccount';
import { useState } from 'react';
import EmailPasswordForm from '../components/EmailPasswordForm';


function Account({ login, setLogin, setStarred }) {
    const [deleted, setDeleted] = useState(null);
    return (
        <>
            <p>{deleted ? deleted : null}</p>
            {login ? 
            (<>
                <Logout setLogin={setLogin}/>

                {/* Change user email form */}
                <EmailPasswordForm
                    title="Change Your Email"
                    id="change-email"
                    url="/user/change-email/"
                    method="PUT"
                    btnText="Change"
                />
                <ResetPasswordDetail />
                <DeleteAccount setLogin={setLogin} setDeleted={setDeleted}/>
            </>) :
            (<>
                {/* Sign Up Form */}
                <EmailPasswordForm 
                    title="Sign Up"
                    id="register"
                    url="/user/register"
                    method="POST"
                    btnText="Sign Up"
                />

                {/* Login Form */}
                <EmailPasswordForm 
                    title="Login"
                    id="login"
                    url="/user/login"
                    method="POST"
                    btnText="Log in"
                    setLogin={setLogin}
                    setStarred={setStarred}
                />
                
                <Link to="/forgotten-password">Forgotten Password?</Link>
            </>) 
            }
        </>
    )
}

export default Account;