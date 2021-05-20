import Loginform from '../components/LoginForm';
import Logout from '../components/Logout'; 
import Profile from '../components/Profile';
import Registerform from '../components/Registerform'; 
import ResetPasswordDetail from '../components/ResetPasswordDetail'; 

function Account({ login, setLogin, setStarred }) {
    return (
        <>
            {login ? 
            (<><Logout setLogin={setLogin}/><Profile /><ResetPasswordDetail /></>) :
            (<><Registerform /><Loginform setLogin={setLogin} setStarred={setStarred}/></>) 
            }
        </>
    )
}

export default Account;