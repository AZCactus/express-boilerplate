import {combineReducers} from 'redux';
import indicators from './indicators';
import routes from './routes';

const rootReducer = combineReducers({
    indicators,
    routes
});

export default rootReducer;
