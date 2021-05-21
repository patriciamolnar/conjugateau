import Loginform from '../components/LoginForm';
import Logout from '../components/Logout'; 
import Registerform from '../components/Registerform'; 
import ResetPasswordDetail from '../components/ResetPasswordDetail'; 
import ChangeEmail from '../components/ChangeEmail';
import DeleteAccount from '../components/DeleteAccount';
import { useState } from 'react';

function Account({ login, setLogin, setStarred }) {
    const [deleted, setDeleted] = useState(null);
    return (
        <>
            <p>{deleted ? deleted : null}</p>
            {login ? 
            (<>
                <Logout setLogin={setLogin}/>
                <ChangeEmail />
                <ResetPasswordDetail />
                <DeleteAccount setLogin={setLogin} setDeleted={setDeleted}/>
            </>) :
            (<>
                <Registerform />
                <Loginform setLogin={setLogin} setStarred={setStarred}/>
            </>) 
            }
        </>
    )
}

export default Account;