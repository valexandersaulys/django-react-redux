import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
}

export default function(state=initialState, action) {
    switch (action.type) {
    case USER_LOADING:
        return {
            ...state,
            isLoading: true
        };
    case USER_LOADED:
        return {
            ...state,
            isLoading: false,
            isAuthenticated: true,
            user: action.payload
        };
    case AUTH_ERROR:
        localStorage.removeItem('token');
        return {
            ...state,
            isLoading: false,
            isAuthenticated: false,
            token: null,
            user: null
        };
    case LOGIN_SUCCESS:
        localStorage.setItem("token", action.payload.token);
        return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            isLoading: false
        };
    case REGISTER_SUCCESS:
        localStorage.setItem("token", action.payload.token);
        return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            isLoading: false
        };
    case LOGIN_FAIL:
        localStorage.removeItem('token');
        return {
            ...state,
            isLoading: false,
            isAuthenticated: false,
            token: null,
            user: null
        };
    case REGISTER_FAIL:
        localStorage.removeItem('token');
        return {
            ...state,
            isLoading: false,
            isAuthenticated: false,
            token: null,
            user: null
        };
    case LOGOUT_SUCCESS:
        localStorage.removeItem('token');
        return {
            isLoading: false,
            isAuthenticated: false,
            token: null,
            user: null
        };
    case LOGOUT_FAIL:
        return {
            ...state
        };
    default:
        return state;
    }
}




