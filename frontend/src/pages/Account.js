import Loginform from '../components/LoginForm';
import Profile from '../components/Profile';
import Registerform from '../components/Registerform'; 

function Account() {
    return (
        <> 
            <Registerform />
            <Loginform />
            <Profile />
        </>
    )
}

export default Account;