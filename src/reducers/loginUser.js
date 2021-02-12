const initialState = {
    data:[]
};

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_DOCTOR':
            return {
                ...state,
                data: [
                    ...state.data,
                    {
                        loginRole: 'doctor',
                        email: action.email
                    }
                ]
            }
        default:
            return state
    }
}

export default loginReducer;