import ActionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    isAuthenticated: false,
    email: "",
    userName: "",
    access_token: ""
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SignupUser:
            return ({
                ...state
            })
        case ActionTypes.SigninUser:
            return ({
                ...state,
                access_token: action.payload.access_token,
                isAuthenticated: true
            })
        case ActionTypes.SignOut:
            return ({
                ...state,
                isAuthenticated: false,
                userName: "",
                password: "",
                access_token: "",
            })
        case ActionTypes.SetCurrentUser:
            return ({
                ...state,
                isAuthenticated: true,
                access_token: action.payload
            })
        default:
            return state;
    }

}