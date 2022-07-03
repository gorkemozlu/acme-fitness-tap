import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import { createForms } from 'react-redux-form';
import { CatalogItems } from './catalogItems';
import { CartItems } from './cartItems';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Contact } from './forms';
import { AuthClientReducer } from './auth';
import { UserReducer } from './user';
import { AuthTokenReducer } from './token';
import { CheckoutReducer } from './checkout';
import { OrderReducer } from './order';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            catalogItems: CatalogItems,
            cartItems: CartItems,
            authClient: AuthClientReducer,
            user: UserReducer,
            authToken: AuthTokenReducer,
            checkout: CheckoutReducer,
            order: OrderReducer,
            ...createForms({
                contact: Contact
            })
        }),
        applyMiddleware(thunk, createLogger)
    );
    return store;
};
