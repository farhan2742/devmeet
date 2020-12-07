const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validatePostInput(data) {

    // Error Object
 
    let errors = {};

    // Normalize strings

    data.text = !isEmpty(data.text) ? data.text : '';

    // Validate Text

    // Check text length

    if(!validator.isLength(data.text, {min: 10, max: 300})) {
        errors.text = 'Post must be between 10 and 300 characters.';
    };

    // Check if text field is empty

    if(validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    };

    // return errors

    return {
        errors,
        isValid : isEmpty(errors)
    };
};