const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateExperienceInput(data) {

    // Error Object
 
    let errors = {};

    // Normalize strings

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.location = !isEmpty(data.location) ? data.location : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    // Validate Title

    // Check if title field is empty

    if(validator.isEmpty(data.title)) {
        errors.title = 'Job title field is required';
    };
    
    // Validate Company

    // Check if company field is empty

    if(validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
    };

    // Validate Location

    // Check if location field is empty

    if(validator.isEmpty(data.location)) {
        errors.location = 'Location field is required';
    };

    // Validate From

    // Check if from field is empty

    if(validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
    };

    // return errors

    return {
        errors,
        isValid : isEmpty(errors)
    };
};