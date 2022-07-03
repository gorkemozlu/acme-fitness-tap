import * as ActionTypes from './ActionTypes';
// import { Map } from 'immutable';

export const CheckoutReducer = (state = {
        address: {},
        delivery: "tractor",
        payment: {},
        status: "Not Submitted",
    }, action) => {
    switch(action.type) {
        case ActionTypes.SET_ADDRESS:
            return {...state, address: action.payload};
        case ActionTypes.SET_DELIVERY:
            return {...state, delivery: action.payload};
        case ActionTypes.SET_PAYMENT:
            return {...state, payment: action.payload};            
        default: 
            return state;
    }
}