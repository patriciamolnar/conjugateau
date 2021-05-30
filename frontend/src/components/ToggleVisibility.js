const ToggleVisibility = ({id, showPass, setShowPass}) => {
    return (
        <label htmlFor={id + 'toggle-password-visibility'}>
            <input 
                type="checkbox" 
                id={id + 'toggle-password-visibility'} 
                checked={showPass}
                onChange={() => setShowPass(!showPass)}
                onKeyPress={(e) => {
                    if(e.key === 'Enter') {
                        setShowPass(!showPass);
                    }
                }}
                />    
            Show password
        </label>
    )
}

export default ToggleVisibility;