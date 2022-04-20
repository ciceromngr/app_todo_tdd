import isEmail from "validator/lib/isEmail";

class EmailValidator {
    isValid(email: string) {
        return isEmail(email)
    }
}

export {
    EmailValidator
};
