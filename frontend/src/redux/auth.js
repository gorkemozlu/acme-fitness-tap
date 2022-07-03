import * as ActionTypes from './ActionTypes';


export const AuthClientReducer = (state = {
        isLoading: true,
        errMess: null,
        authClient: null
    }, action) => {
    switch(action.type) {
        case ActionTypes.STORE_AUTH_CLIENT:
            return {...state, isLoading: false, errMess: null, authClient: action.payload};
        case ActionTypes.AUTH_CLIENT_LOADING:
            return {...state, isLoading: true, errMess: null, authClient: null};
        case ActionTypes.AUTH_CLIENT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, authClient: null};
        default: 
            return state;
    }
}