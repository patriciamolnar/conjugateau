function Logout() {
    const logoutUser = () => {
        fetch('/user/logout')
            .then((result) => result.json())
            .then((info) => { console.log(info); })
    }

    return(
        <button onClick={logoutUser}>Logout</button>
    )
}

export default Logout; 