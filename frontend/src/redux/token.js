import * as ActionTypes from './ActionTypes';


export const AuthTokenReducer = (state = {
        isLoading: false,
        errMess: null,
        authToken: null
    }, action) => {
    switch(action.type) {
        case ActionTypes.SET_TOKEN:
            return {...state, isLoading: false, errMess: null, authToken: action.payload};
        case ActionTypes.TOKEN_LOADING:
            return {...state, isLoading: true, errMess: null, authToken: null};
        case ActionTypes.TOKEN_ERROR:
            return {...state, isLoading: false, errMess: action.payload, authToken: null};
        default: 
            return state;
    }
}