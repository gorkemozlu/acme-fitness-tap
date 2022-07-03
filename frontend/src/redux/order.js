import * as ActionTypes from './ActionTypes';


export const OrderReducer = (state = {
        isLoading: false,
        errMess: null
    }, action) => {
    switch(action.type) {
        case ActionTypes.ORDER_LOADING:
            return {...state, isLoading: true, errMess: null};
        case ActionTypes.ORDER_ERROR:
            return {...state, isLoading: false, errMess: action.payload};
        case ActionTypes.ORDER_SUCCESS:
            return {...state, isLoading: false, errMess: null};
        default: 
            return state;
    }
}