//handle email or usename duplicates
const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `An account with that ${field} already exists.`;
    res.status(code).send({success: false, message: error, fields: field});
}

//handle field formatting and empty fields
const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;
    if(errors.length > 1) {
        const formattedErrors = errors.join(' ');
        res.status(code).send({success: false, message: formattedErrors, fields: fields});
    } else {
        res.status(code).send({success: false, message: errors, fields: fields})
    }
}


module.exports = (err, req, res, next) => {
    try {
        if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
        if(err.name === 'ValidationError') return err = handleValidationError(err, res);
    } catch(err) {
        res.status(500).send('An unknown error occurred.');
    }
}