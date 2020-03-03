import {
    GET_VOLCANOES,
    ADD_VOLCANO,
    DELETE_VOLCANO,
    UPDATE_VOLCANO,
    VOLCANOES_LOADING,
    GET_VOLCANO, VOLCANOES_LOADED, VOLCANO_LOADING, VOLCANO_LOADED
} from "../actions/types";

const initialState = {
    volcanoes: [],
    loading: false,
    volcano: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_VOLCANOES:
            return {
                ...state,
                volcanoes: action.payload,
                loading: false
            };
        case GET_VOLCANO:
            return {
                ...state,
                volcano: action.payload,
                loading: false
            };
        case DELETE_VOLCANO:
            return {
                ...state,
                volcanoes: state.volcanoes.filter(volcano => volcano._id !== action.payload)
            };
        case ADD_VOLCANO:
            return {
                ...state,
                volcanoes: [action.payload, ...state.volcanoes]
            };
        case UPDATE_VOLCANO:
            return {
                ...state,
                volcanoes: [action.payload, ...state.volcanoes]
            };
        case VOLCANOES_LOADING:
            return {
              ...state,
              loading: true
            };
        case VOLCANOES_LOADED:
            return {
                ...state,
                loading: false
            };
        case VOLCANO_LOADING:
            return {
              ...state,
              loading: true
            };
        case VOLCANO_LOADED:
            return {
                ...state,
                loading: false
            };
        default:
            return state
    }
}
