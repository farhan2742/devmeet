const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateEducationInput(data) {

    // Error Object
 
    let errors = {};

    // Normalize strings

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    // Validate School

    // Check if school field is empty

    if(validator.isEmpty(data.school)) {
        errors.school = 'School field is required';
    };
    
    // Validate Degree

    // Check if degree field is empty

    if(validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required';
    };

    // Validate Field of study

    // Check if fieldofstudy field is empty

    if(validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Field of study field is required';
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