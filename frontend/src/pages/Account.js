import Loginform from '../components/LoginForm';
import Logout from '../components/Logout'; 
import Profile from '../components/Profile';
import Registerform from '../components/Registerform'; 

function Account() {
    return (
        <> 
            <Registerform />
            <Loginform />
            <Logout />
            {/* <Profile /> */}
        </>
    )
}

export default Account;