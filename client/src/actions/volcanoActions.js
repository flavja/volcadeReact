import {
    GET_VOLCANOES,
    GET_VOLCANO,
    ADD_VOLCANO,
    DELETE_VOLCANO,
    VOLCANOES_LOADING,
    VOLCANO_LOADING, GET_VOLCANO_FAIL, GET_VOLCANOES_FAIL, UPDATE_VOLCANO,
} from "./types";
import {tokenConfig} from "./authActions";
import {returnErrors} from "./errorActions";
import axios from 'axios';


export const getVolcanoes = () => (dispatch, getState) => {
    dispatch(setVolcanoesLoading());
    axios
        .get('/api/volcanoes', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_VOLCANOES,
                payload: res.data
            }))
        .catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status, 'GET_VOLCANOES_FAIL'));
            dispatch({
                type: GET_VOLCANOES_FAIL
            })
        })
    ;
};
export const getVolcano = id => (dispatch, getState) => {
    dispatch(setVolcanoIsLoading());
    axios
        .get(`/api/volcanoes/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_VOLCANO,
                payload: res.data
            })
        )
        .catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status, 'GET_VOLCANO_FAIL'));
            dispatch({
                type: GET_VOLCANO_FAIL
            })
        })
    ;
};

export const deleteVolcano = id => (dispatch, getState) => {
    axios
        .delete(`/api/volcanoes/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_VOLCANO,
                payload: id
            })
        })
        .catch(error =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
};

export const addVolcano = volcano => (dispatch, getState) => {
    axios
        .post('/api/volcanoes', volcano, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_VOLCANO,
                payload: res.data
            })
        )
        .catch(error =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
};

export const updateVolcano = (id, volcano) => (dispatch, getState) => {
    axios
        .put(`/api/volcanoes/${id}`, volcano, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: UPDATE_VOLCANO,
                payload: res.data
            })
        )
        .catch(error =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
};

export const setVolcanoesLoading = () => {
    return {
        type: VOLCANOES_LOADING
    };
};
export const setVolcanoIsLoading = () => {
    return {
        type: VOLCANO_LOADING
    };
};
