import {createStore} from 'redux';

const store = createStore(reducer);

function reducer(state, action) {
    if (action.type !== null) {
        return {type: action.type, value: action.value}
    }
    return state;
}

export default store;