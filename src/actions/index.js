const LOGIN_DOCTOR = 'LOGIN_DOCTOR';
export const loginDr = (email, password) => ({
    type: LOGIN_DOCTOR,
    email,
    password
});