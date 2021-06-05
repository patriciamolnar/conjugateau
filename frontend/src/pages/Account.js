import { Link } from 'react-router-dom';
import Logout from '../components/Logout'; 
import ResetPasswordDetail from '../components/ResetPasswordDetail'; 
import DeleteAccount from '../components/DeleteAccount';
import { useState } from 'react';
import EmailPasswordForm from '../components/EmailPasswordForm';
import Misc from '../components/Misc';


function Account({ login, setLogin, setStarred, deleted, setDeleted }) {
    return (
        <main className="default">
            {login ? 
            (<>
                {/* passing setDeleted in case user registers after deletion
                    and then logs out: this removed deletion confirmation */}
                <Logout setLogin={setLogin} setDeleted={setDeleted}/>

                <div className="account">
                    <h2>Welcome to Conjugâteau</h2>

                    <p>An app that makes learning French conjugation a piece of cake!</p>

                    <h3>Manage your account</h3>

                    {/* Change user email form */}
                    <div className="account-grid">
                        <EmailPasswordForm
                            title="Change Your Email"
                            id="change-email"
                            url="/user/change-email/"
                            method="PUT"
                            btnText="Change"
                        />
                        <ResetPasswordDetail />
                        <DeleteAccount setLogin={setLogin} setDeleted={setDeleted}/>
                        <Misc />
                    </div>
                </div>
            </>) :
            (<div className="account">
                <h2>Sign Up or Login</h2>
                <p className="correct">{deleted && deleted}</p>
                <div className="account-grid">
                    {/* Sign Up Form */}
                    <EmailPasswordForm 
                        title="Sign Up"
                        id="register"
                        url="/user/register"
                        method="POST"
                        btnText="Sign Up"
                    />

                    {/* Login Form */}
                    <div>
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
                    </div>
                </div>
            </div>) 
            }
        </main>
    )
}

export default Account;