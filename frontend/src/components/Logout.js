function Logout({ setLogin }) {
    const logoutUser = () => {
        fetch('/user/logout')
            .then((result) => result.json())
            .then((info) => {
                if(info.success) {
                    setLogin(false);
                }
            })
    }

    return(
        <button onClick={logoutUser} className="logout">Logout</button>
    )
}

export default Logout; 