import {
    EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER,
    USER_CREATE, USERNAME_CHANGED,
} from "../actions/types"


const INITIAL_STATE = { email: '', password: '', username: '', user: null, error: '', loading: false };


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload};
        case PASSWORD_CHANGED:
            return {...state, password: action.payload};
        case USERNAME_CHANGED:
            return {...state, username: action.payload};
        case LOGIN_USER:
            return {...state, loading: true, error: ''};
        case LOGIN_USER_SUCCESS:
            return {...state, ...INITIAL_STATE, user: action.payload};
        case LOGIN_USER_FAIL:
            return {...state, error: 'Invalid Credentials', password: '', loading: false};
        case USER_CREATE:
            return {...state, loading: true, error: ''};
        default:
            return state;
    }
};