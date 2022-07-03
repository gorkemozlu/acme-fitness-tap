import * as ActionTypes from './ActionTypes';


export const CartItems = (state = {
        isLoading: false,
        errMess: null,
        cartItems: null
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_CART_ITEMS:
            return {...state, isLoading: false, errMess: null, cartItems: action.payload};
        case ActionTypes.CART_ITEMS_LOADING:
            return {...state, isLoading: true, errMess: null, cartItems: null};
        case ActionTypes.CART_ITEMS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, cartItems: null};
        default: 
            return state;
    }
}