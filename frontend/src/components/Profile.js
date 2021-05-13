function Profile() {
    const [user, setUser] = useState({ 
        name: '',
        country: ''
    });

    const updateDetails = (e) => {
        const inputName = e.target.name; 
        const inputValue = e.target.value; 
        setUser(prevState => {
            return {...prevState, [inputName]: inputValue}
        });
    }

    const saveDetails = (e) => {
        e.preventDefault(); 

        fetch('/user/info', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
            })
            .then((result) => result.json())
            .then((info) => { console.log(info); })
    }

    return(
        <>
            <p>Your details</p>
            <form onSubmit={saveDetails}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name"
                    value={user.name} autocomplete="name"
                    onChange={(e) => updateDetails(e)}/>
                <label htmlFor="country">Country:</label>
                <input type="text" id="country" name="country"
                    value={user.location} autocomplete="country"
                    onChange={(e) => updateDetails(e)}/>
                <button type="submit">Update</button>
            </form>
        </>
    )
}

export default Profile