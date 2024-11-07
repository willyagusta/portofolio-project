import validator from 'validator';

//validation for contact from
function validateValues({ email, firstName, lastName, }) {
    const emailValid = validator.isEmail(email);
    const firstNameValid = validator.isAlpha(firstName.trim().replace('-',''));
    const lastNameValid = validator.isAlpha(lastName.trim().replace('-',''));

    return emailValid && firstNameValid && lastNameValid
};

//sanitize function, replace any non-alphanumeric characters
const cleanStringRegex = new RegExp(`[^a-zA-Z0-9 '!\?,\.]`, 'gmi');
const sanitizeText = (str) => str.trim().replace(cleanStringRegex, '');

//sanitize name, only allows alphabetic, hyphens, and space
const cleanNameRegex = new RegExp(`[^a-zA-Z ,\.]`, 'gmi');
const sanitizeName = (name) => name.trim().replace(cleanNameRegex, '');

// handler for the contact submit form
export async function handleSubmitContact ({
    email,
    firstName,
    lastName,
    comments,
}) {
    if (!email || !firstName || !lastName || !comments) {
        throw new Error ('form values can not be empty')
    };
    if (!validateValues({ email, firstName, lastName, comments })) {
        throw new Error ('Input is not valid')
    }
    try {
        email = email.trim().toLowerCase();
        firstName = sanitizeName(firstName);
        lastName = sanitizeName(lastName);
        comments = sanitizeText(comments);

    console.log(`===debug: form input received: `, {
        email,
        firstName,
        lastName,
        comments,
    });
} catch (err) {
    throw new Error ('sanitization failed');
    }
}