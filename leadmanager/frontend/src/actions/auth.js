import axios from 'axios';

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
} from './types';


export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });     // user loading
    
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: AUTH_ERROR
            });
        });
};

export const login = (username, password) => dispatch => {
    const body = JSON.stringify({username, password});

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    console.log(body);

    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

export const register = ({username, email, password}) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const body = JSON.stringify({username, password, email});

    axios.post('/api/auth/register', body, config) // config might need to be seperate
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: REGISTER_FAIL
            });
        });    
};

export const logout = () => (dispatch, getState) => {
    axios.post("/api/auth/logout", null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        })
        .catch(err => {
            dispatch({ type: LOGOUT_FAIL });
            console.log(err);
        });
};

// helper for setup config with tokens
export const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  };

  return config;
};
