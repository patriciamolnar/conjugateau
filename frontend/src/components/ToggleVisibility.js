const ToggleVisibility = ({id, showPass, setShowPass}) => {
    return (
        <label htmlFor={id + 'toggle-password-visibility'}>
            <input 
                type="checkbox" 
                id={id + 'toggle-password-visibility'} 
                checked={showPass}
                onChange={() => setShowPass(!showPass)}/>
            Show password
        </label>
    )
}

export default ToggleVisibility;