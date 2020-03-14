

// imported password validation lib
import * as passwordValidator from 'password-validator';
import { ValidationErrors } from '@angular/forms/src/directives/validators';


// Create a schema
const schema = new passwordValidator();

// Add properties to it
schema
    .is().min(10)                                    // Minimum length 10
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


// only this function is visible and can be called return error codes like  min max uppercase
export function validatePassword(password:string): ValidationErrors {
    return schema.validate(password, {list:true});
}
