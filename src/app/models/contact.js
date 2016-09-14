export const DEFAULT_CONTACT = {
    firstName: "",
    lastName: "",
    email: ""
};

export const validate = contact => {
    var validations = {};
    if(!contact.firstName || !contact.firstName.trim().length)
        validations.name = "Name is required and cannot be empty";

    if(contact.email && (!contact.email.trim().length || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(contact.email)))
        validations.email = "Email must in email format if provided";

    return validations;
};