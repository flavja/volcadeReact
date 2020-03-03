import {
    GET_WATERFALLS,
    GET_WATERFALL,
    ADD_WATERFALL,
    DELETE_WATERFALL,
    WATERFALLS_LOADING,
    WATERFALL_LOADING, GET_WATERFALL_FAIL, GET_WATERFALLS_FAIL, UPDATE_WATERFALL,
} from "./types";
import {tokenConfig} from "./authActions";
import {returnErrors} from "./errorActions";
import axios from 'axios';


export const getWaterfalls = () => (dispatch, getState) => {
    dispatch(setWaterfallsLoading());
    axios
        .get('/api/waterfalls', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_WATERFALLS,
                payload: res.data
            }))
        .catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status, 'GET_WATERFALLS_FAIL'));
            dispatch({
                type: GET_WATERFALLS_FAIL
            })
        })
    ;
};
export const getWaterfall = id => (dispatch, getState) => {
    dispatch(setWaterfallIsLoading());
    axios
        .get(`/api/waterfalls/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_WATERFALL,
                payload: res.data
            })
        )
        .catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status, 'GET_WATERFALL_FAIL'));
            dispatch({
                type: GET_WATERFALL_FAIL
            })
        })
    ;
};

export const deleteWaterfall = id => (dispatch, getState) => {
    axios
        .delete(`/api/waterfalls/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_WATERFALL,
                payload: id
            })
        })
        .catch(error =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
};

export const addWaterfall = waterfall => (dispatch, getState) => {
    axios
        .post('/api/waterfalls', waterfall, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_WATERFALL,
                payload: res.data
            })
        )
        .catch(error =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
};

export const updateWaterfall = (id, waterfall) => (dispatch, getState) => {
    axios
        .put(`/api/waterfalls/${id}`, waterfall, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: UPDATE_WATERFALL,
                payload: res.data
            })
        )
        .catch(error =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
};

export const setWaterfallsLoading = () => {
    return {
        type: WATERFALLS_LOADING
    };
};
export const setWaterfallIsLoading = () => {
    return {
        type: WATERFALL_LOADING
    };
};
