const LOGIN_DOCTOR = 'LOGIN_DOCTOR';
export const loginDr = (email, password) => ({
    type: LOGIN_DOCTOR,
    email,
    password
});

const LOGIN_PATIENT = 'LOGIN_PATIENT';
export const loginPatient = (email, password) => ({
    type: LOGIN_PATIENT,
    email,
    password
});

const LOGOUT = 'LOGOUT';
export const logout = () => ({
    type: LOGOUT
});