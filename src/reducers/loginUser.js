const initialState = {
    data:[]
};

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_DOCTOR':
            localStorage.setItem('loginRole', 'doctor')
            return {
                ...state,
                data: [
                    {
                        loginRole: 'doctor',
                        email: action.email
                    }
                ]
            }
        case 'LOGIN_PATIENT':
            localStorage.setItem('loginRole','patient')
            localStorage.setItem('email', action.email)
            return {
                ...state,
                data: [
                    {
                        loginRole: 'patient',
                        email: action.email
                    }
                ]
            }
        case 'LOGOUT':
            localStorage.removeItem('loginRole')
            localStorage.removeItem('email')
            return {
                ...state,
                data: [
                    {
                        loginRole: null,
                        email: null
                    }
                ]
            }
        default:
            return state
    }
}

export default loginReducer;