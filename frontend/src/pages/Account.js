import Loginform from '../components/LoginForm';
import Logout from '../components/Logout'; 
import Registerform from '../components/Registerform'; 
import ResetPasswordDetail from '../components/ResetPasswordDetail'; 
import ChangeEmail from '../components/ChangeEmail';

function Account({ login, setLogin, setStarred }) {
    return (
        <>
            {login ? 
            (<><Logout setLogin={setLogin}/><ChangeEmail /><ResetPasswordDetail /></>) :
            (<><Registerform /><Loginform setLogin={setLogin} setStarred={setStarred}/></>) 
            }
        </>
    )
}

export default Account;