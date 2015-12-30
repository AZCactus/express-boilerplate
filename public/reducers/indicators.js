import * as types from '../constants/actions';

const initialState = [
];


export default function indicators (state = initialState, action) {
    switch (action.type) {
        case types.ATTACH_INDICATOR:
            state.push({id:action.id});
            return state;
        default:
            return initialState;
    }
}
