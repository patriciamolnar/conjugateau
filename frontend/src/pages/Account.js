import Loginform from '../components/LoginForm';
import Logout from '../components/Logout'; 
import Profile from '../components/Profile';
import Registerform from '../components/Registerform'; 

function Account({ login, setLogin }) {
    return (
        <>
            {login ? 
            (<><Logout setLogin={setLogin}/><Profile /></>) :
            (<><Registerform /><Loginform setLogin={setLogin} /></>) 
            }
        </>
    )
}

export default Account;