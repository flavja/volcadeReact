import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers';
import {loadState, saveState} from "./localStorage";


const persistedState = loadState();

const middleware = [thunk];
const store = createStore(rootReducer, persistedState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

store.subscribe(() => {
    saveState({
        auth: store.getState().auth,
        volc: store.getState().volc,
        waterf: store.getState().waterf
    });
});

export default store;
