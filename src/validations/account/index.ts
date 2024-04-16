export const EmailValidator = (value: string): string | undefined => {
    if (!value) return 'Email must not be empty';
    if (/[а-яА-Я]/.test(value)) return 'Value must not contain Cyrillic characters';
    if (value.length < 5) return 'Email must be at least 5 characters long';
    if (value.length > 254) return 'Email must be less than 254 characters long';
    if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value)) {
        return 'Invalid email address format';
    }
    return undefined;
};

export const FirstNameValidator = (value: string): string | undefined => {
    if (!value) return 'First name must not be empty';
    if (value.length < 3) return 'First name must be at least 3 characters long';
    if (value.length > 50) return 'First name must be less than 50 characters long';
    if (!/^[A-Za-z\s]+$/.test(value)) return 'First name must contain only letters and spaces';
    if (/[£# “”]/.test(value)) return 'First name must not contain the following characters: £ # “”';
    return undefined;
};

export const LastNameValidator = (value: string): string | undefined => {
    if (!value) return 'Last name must not be empty';
    if (value.length < 3) return 'Last name must be at least 3 characters long';
    if (value.length > 50) return 'Last name must be less than 50 characters long';
    if (!/^[A-Za-z\s]+$/.test(value)) return 'Last name must contain only letters and spaces';
    if (/[£# “”]/.test(value)) return 'Last name must not contain the following characters: £ # “”';
    return undefined;
};

export const BirthdayValidator = (value: Date): string | undefined => {
    if (!value) return 'Birthday must not be empty';
    const today = new Date();
    const birthdate = new Date(value);
    if (birthdate > today) return 'Birthday cannot be in the future';
    return undefined;
};

export const GenderValidator = (value: string): string | undefined => {
    const validGenders = ['Male', 'Female', 'Other'];
    if (!value) return 'Gender must not be empty';
    if (!validGenders.includes(value)) return `Gender must be one of the following: ${validGenders.join(", ")}`;
    return undefined;
};

export const PasswordValidator = (value: string): string | undefined => {
    if (!value) return 'Password must not be empty';
    if (value.length < 8) return 'Password must be at least 8 characters long';
    if (value.length > 24) return 'Password must be less than 24 characters long';
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/\d/.test(value)) return 'Password must contain at least one digit';
    if (!/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(value)) return 'Password must contain at least one special character';
    if (/[£# “”]/.test(value)) return 'Password must not contain the following characters: £ # “”';
    if (/[а-яА-Я]/.test(value)) return 'Value must not contain Cyrillic characters';
    return undefined;
};

export const ConfirmPasswordValidator = (password: string, confirmPassword: string): string | undefined => {
    if (!confirmPassword) return 'Confirm password must not be empty';
    if (confirmPassword !== password) return 'Passwords do not match';
    return undefined;
};



// export const RoleValidator = (value: string): string | undefined => {
//     if (!value) return 'Role must not be empty';
//     if (value.length < 4) return 'Role must be at least 4 characters long';
//     if (value.length > 100) return 'Role must be less than 100 characters long';
//     if (!/^[A-Za-z\s]+$/.test(value)) return 'Role must contain only letters and spaces';
//     return undefined;
// };