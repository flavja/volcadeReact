import {
    GET_WATERFALLS,
    ADD_WATERFALL,
    DELETE_WATERFALL,
    UPDATE_WATERFALL,
    WATERFALLS_LOADING,
    GET_WATERFALL, WATERFALLS_LOADED, WATERFALL_LOADING, WATERFALL_LOADED
} from "../actions/types";

const initialState = {
    waterfalls: [],
    loading: false,
    waterfall: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_WATERFALLS:
            return {
                ...state,
                waterfalls: action.payload,
                loading: false
            };
        case GET_WATERFALL:
            return {
                ...state,
                waterfall: action.payload,
                loading: false
            };
        case DELETE_WATERFALL:
            return {
                ...state,
                waterfalls: state.waterfalls.filter(waterfall => waterfall._id !== action.payload)
            };
        case ADD_WATERFALL:
            return {
                ...state,
                waterfalls: [action.payload, ...state.waterfalls]
            };
        case UPDATE_WATERFALL:
            return {
                ...state,
                waterfalls: [action.payload, ...state.waterfalls]
            };
        case WATERFALLS_LOADING:
            return {
              ...state,
              loading: true
            };
        case WATERFALLS_LOADED:
            return {
                ...state,
                loading: false
            };
        case WATERFALL_LOADING:
            return {
              ...state,
              loading: true
            };
        case WATERFALL_LOADED:
            return {
                ...state,
                loading: false
            };
        default:
            return state
    }
}
