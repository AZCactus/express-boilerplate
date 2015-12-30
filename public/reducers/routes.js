import * as types from '../constants/actions';

const initialState = [
    {href: '/projects', name: 'Projects'},
    {href: '/indicators', name: 'Indicators'}
];

export default function routes(state = initialState, action) {
    switch(action.type) {
        case types.CHANGE_ROUTE:
            state.forEach((route,idx) => {
                if (route.href == action.path) {
                    state[idx]['active'] = true;
                } else {
                    state[idx]['active'] = false;
                }
            });
            return state;
        default:
            return initialState;
    }
}