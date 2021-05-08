function Table( {infinitive, name, verbs} ) {
    return (
        <table key={infinitive + '-' + name}>
            <tr>
                <th>{name}</th>
            </tr>
            {Object.entries(verbs).map(([key,value])=>{
                return (
                    <tr key={key + '-' + value.toString()}>
                        <td>{key}</td>
                        <td>{value.toString()}</td>
                    </tr>
                );
            })}
        </table>
    )
}

export default Table; 