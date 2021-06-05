function Logout({ setLogin, setDeleted }) {
    const logoutUser = () => {
        fetch('/user/logout')
            .then((result) => result.json())
            .then((info) => {
                if(info.success) {
                    setLogin(false);
                }
            });
    }

    return(
        <button onClick={() => {
            setDeleted(false);
            logoutUser();
        }} className="logout">Logout</button>
    )
}

export default Logout; 