import {createStore} from 'redux';
import rootReducer from '../reducers/root';

export default function configureStore (initialState = initialState) {
    const store = createStore(rootReducer, initialState);
    return store;
}
