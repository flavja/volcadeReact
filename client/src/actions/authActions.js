import axios from 'axios';
import {returnErrors} from "./errorActions";
import {
    USER_LOADED, USER_LOADING,
    AUTH_ERROR, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL,
} from "./types";

//check token and load user
export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({type: USER_LOADING});

    axios
        .get('/api/authenticate/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
    ;
};

//register User
export const register = ({firstname, lastname, email, password, isAdmin}) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //request body
    const body = JSON.stringify({firstname, lastname, email, password, isAdmin});
    axios
        .post('/api/authenticate/register', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
};

//Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
};

//Login User
export const login = ({email, password}) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //request body
    const body = JSON.stringify({email, password});
    axios
        .post('/api/authenticate/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
};

//setup config headers and token
export const tokenConfig = getState => {
    //get token from localStorage by calling token in authReducer
    const token = getState().auth.token;
    //headers
    const config = {
        headers: {}
    };
    //if token add to header
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
};
