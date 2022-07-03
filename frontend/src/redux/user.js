import * as ActionTypes from './ActionTypes';


export const UserReducer = (state = {
        errMess: null,
        user: null
    }, action) => {
    switch(action.type) {
        case ActionTypes.STORE_USER:
            return {...state, errMess: null, user: action.payload};
        case ActionTypes.GET_USER_ERROR:
            return {...state, errMess: action.payload, user: null};
        default: 
            return state;
    }
}