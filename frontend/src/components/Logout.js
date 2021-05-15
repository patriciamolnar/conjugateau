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
        <button onClick={logoutUser}>Logout</button>
    )
}

export default Logout; 