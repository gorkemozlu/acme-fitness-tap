import * as ActionTypes from './ActionTypes';


export const CatalogItems = (state = {
        isLoading: true,
        errMess: null,
        catalogItems: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_CATALOG_ITEMS:
            return {...state, isLoading: false, errMess: null, catalogItems: action.payload};
        case ActionTypes.CATALOG_ITEMS_LOADING:
            return {...state, isLoading: true, errMess: null, catalogItems: []};
        case ActionTypes.CATALOG_ITEMS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, catalogItems: []};
        default: 
            return state;
    }
}