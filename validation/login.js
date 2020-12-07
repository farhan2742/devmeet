const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateLoginInput(data) {

    // Error Object
 
    let errors = {};

    // Normalize strings

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // Validate Email

    // Check if email address is valid
    
    if(!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    };

    // Check if email field is empty

    if(validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    };
    
    // Validate password

    // Check if password field is empty

    if(validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    };

    // return errors

    return {
        errors,
        isValid : isEmpty(errors)
    };
};