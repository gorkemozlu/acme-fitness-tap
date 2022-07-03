import axios from 'axios';
import * as ActionTypes from './ActionTypes';
import { baseUrl, catalogUrl, cartUrl, orderUrl } from '../shared/baseUrl';
import { mockCatalogItems } from '../mock/mockCatalogData'
import { mockCartItems } from '../mock/mockCartItems';
import { localDev, localDevError } from '../shared/localDev';
import createAuth0Client from '@auth0/auth0-spa-js';
import { getConfig } from "../config";



export const postContactForm = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
    const newContact = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    }
    newContact.date = new Date().toISOString();
    return fetch(baseUrl + 'contact', {
        method: 'POST',
        body: JSON.stringify(newContact),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error: ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .catch(error => {
            alert('Your contact request could not be posted\nError: ' + error.message);
        })
};


export const fetchCatalogItems = () => {
    if(localDevError) {
        return fetchCatalogItemsLocalError();
    }
    else if (localDev) {
        return fetchCatalogItemsLocal();
    }
    else {
        return fetchCatalogItemsRemote();
    }
}

export const fetchCatalogItemsLocal = () => (dispatch) => {
    dispatch(catalogItemsLoading());
    // const decItems = mockCatalogItems.map((itm, i) => {
    //     itm.id=""+i;
    //     return itm;
    // })
    setTimeout(() => {
        dispatch(addCatalogItems(mockCatalogItems));
        //.catch(error => dispatch(catalogItemsFailed(error.message)));
    }, 5000);
}

export const fetchCatalogItemsLocalError = () => (dispatch) => {
    dispatch(catalogItemsLoading());
    setTimeout(() => {
        dispatch(catalogItemsFailed("local dev error"));
        //.catch(error => dispatch(catalogItemsFailed(error.message)));
    }, 5000);
}



export const fetchCatalogItemsRemote = () => (dispatch) => {
    dispatch(catalogItemsLoading(true));
    return axios.get(catalogUrl + 'products')
        .then(response => {
            if (response.status == 200) {
                return response.data.data;
            }
            else {
                var error = new Error('Error: ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                if (error.response) {
                    var errmess = new Error(error.response.data);
                    throw errmess;
                }
                else {
                    throw new Error(error);
                }
            })
        //.then(response => response.json())
        .then(catalogItems => dispatch(addCatalogItems(catalogItems)))
        .catch(error => dispatch(catalogItemsFailed(error.message)));
}


// export const fetchAuthClient = () => (dispatch) => {
//     setTimeout(() => {
//         fetchAuthClient2()(dispatch);
//     }, 2000)
// }

export const fetchAuthClient = () => (dispatch) => {
    console.log("FETCH AUTH CLIENT");
    const config = getConfig();
    dispatch(authClientLoading());
    createAuth0Client({
        domain: config.domain,
        client_id: config.clientId,
        audience: config.audience
    })
    .then(authClient => {
        dispatch(storeAuthClient(authClient));
        authClient.getUser()
        .then(user => {
            if(user != null) {
                dispatch(storeUser(user));
                dispatch(fetchCartItems(authClient));
            }
        });
        dispatch(getTokenFromAuthClient(authClient));
    })
    .catch(error => dispatch(authClientFailed(error.message)));
}

export const getTokenFromAuthClient = (authClient) => (dispatch) => {
    dispatch(tokenLoading());
    return authClient.getTokenSilently()
    .then((accessToken) => {
        dispatch(setToken(accessToken));
    })
    .catch((err) => {
        dispatch(tokenFailed(err))
    });
}


export const fetchCartItems = (authClient) => {
    if(localDevError) {
        return fetchCartItemsLocalError();
    }
    else if (localDev) {
        return fetchCartItemsLocal();
    }
    else {
        return fetchCartItemsRemote(authClient);
    }
}

export const fetchCartItemsLocal = () => (dispatch) => {
    dispatch(cartItemsLoading());
    
    setTimeout(() => {
        dispatch(addCartItems(mockCartItems));
        //.catch(error => dispatch(catalogItemsFailed(error.message)));
    }, 2000);
}

export const fetchCartItemsLocalError = () => (dispatch) => {
    dispatch(cartItemsLoading());
    setTimeout(() => {
        dispatch(cartItemsFailed("local dev error"));
    }, 3000);
}

export const fetchCartItemsRemote = (authClient) => (dispatch) => {
    dispatch(cartItemsLoading(true));

    authClient.getTokenSilently()
    .then((authToken) => {
        const cfg = {headers: { Authorization: `Bearer ${authToken}` }}
        return axios.get(cartUrl + 'cart/items', cfg)
        .then(response => {
            console.log(response);
            if (response.status >= 200 && response.status <= 299) {
                console.log("response: ");
                console.log(response);
                console.log("data");
                console.log(response.data);
                console.log("cart");
                console.log(response.data.cart);
                return response.data.cart;
            }
            else {
                var error = new Error('Error: ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        //.then(response => response.json())
        .then(cartItems => {
            console.log('in the .then');
            console.log(cartItems);
            dispatch(addCartItems(cartItems))
        })
        .catch(error => 
            dispatch(cartItemsFailed(error.message))
        );
    })
    .catch(error => {
        console.log("cart error");
        console.log(error);
        dispatch(addCartItems(null));
    })
}


export const postCartData = (authToken, values) => {
    console.log("postCartData");
    console.log(values);
    return postCartDataRemote(authToken, values);
};

export const postCartDataLocal = (values) => (dispatch) => {
    console.log("Post Cat Data Local");
    dispatch(cartItemsLoading());
    var promise = new Promise(function(resolve, reject) {
        setTimeout( () =>  {
          dispatch(addCartItems(values));
          resolve(values);
        }, 2000);
      });
      return promise;
}

export const postCartDataRemote = (authToken, values) => (dispatch) => {
    dispatch(cartItemsLoading(true));
    const cfg = {headers: { Authorization: `Bearer ${authToken}` }}
    return axios.post(cartUrl + 'cart/modify', values, cfg)
    .then(response => {
        console.log(response);
        if (response.status == 200) {
            console.log("response: ");
            console.log(response);
            console.log("data");
            console.log(response.data);
            console.log("cart");
            console.log(response.data.cart);
            return response.data.cart;
        }
        else {
            var error = new Error('Error: ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    //.then(response => response.json())
    .then(cartItems => {
        console.log('in the .then');
        console.log(cartItems);
        dispatch(addCartItems(cartItems))
    })
    .catch(error => 
        dispatch(cartItemsFailed(error.message))
    );
}

export const postOrder = (payload, authToken, callback) => (dispatch) => {
    const cfg = {headers: { Authorization: `Bearer ${authToken}` }}
    dispatch(orderLoading());
    return axios.post(orderUrl + 'order/add', payload, cfg)
    .then(response => {
        if (response.status == 200) {
            dispatch(orderSuccess());
            dispatch(postCartData(authToken, {cart: {}}))
            callback();
        }
        else{
            dispatch(orderFailed(response.status + " : " + response.data));
            callback();
        }
    })
    .catch(error => {
        dispatch(orderFailed(error.message));
        callback();
    });
}

export const catalogItemsLoading = () => ({
    type: ActionTypes.CATALOG_ITEMS_LOADING,
});

export const cartItemsLoading = () => ({
    type: ActionTypes.CART_ITEMS_LOADING,
});

export const authClientLoading = () => ({
    type: ActionTypes.AUTH_CLIENT_LOADING,
});

export const tokenLoading = () => ({
    type: ActionTypes.TOKEN_LOADING,
});

export const orderLoading = () => ({
    type: ActionTypes.ORDER_LOADING,
});

export const orderSuccess = () => ({
    type: ActionTypes.ORDER_SUCCESS,
});

export const orderFailed = (errMess) => ({
    type: ActionTypes.ORDER_ERROR,
    payload: errMess
});


export const catalogItemsFailed = (errmesg) => ({
    type: ActionTypes.CATALOG_ITEMS_FAILED,
    payload: errmesg
});

export const cartItemsFailed = (errmesg) => ({
    type: ActionTypes.CART_ITEMS_FAILED,
    payload: errmesg
});

export const authClientFailed = (errmesg) => ({
    type: ActionTypes.AUTH_CLIENT_FAILED,
    payload: errmesg
});

export const tokenFailed = (errmesg) => ({
    type: ActionTypes.TOKEN_ERROR,
    payload: errmesg
});

export const getUserError = (errmesg) => ({
    type: ActionTypes.GET_USER_ERROR,
    payload: errmesg
});


export const addCatalogItems = (catalogItems) => ({
    type: ActionTypes.ADD_CATALOG_ITEMS,
    payload: catalogItems
});

export const addCartItems = (cartItems) => ({
    type: ActionTypes.ADD_CART_ITEMS,
    payload: cartItems
});

export const storeAuthClient = (authClient) => ({
    type: ActionTypes.STORE_AUTH_CLIENT,
    payload: authClient
});

export const storeUser = (user) => ({
    type: ActionTypes.STORE_USER,
    payload: user
});

export const setToken = (token) => ({
    type: ActionTypes.SET_TOKEN,
    payload: token
});

export const setAddress = (address) => ({
    type: ActionTypes.SET_ADDRESS,
    payload: address
});

export const setDelivery = (delivery) => ({
    type: ActionTypes.SET_DELIVERY,
    payload: delivery
});

export const setPayment = (payment) => ({
    type: ActionTypes.SET_PAYMENT,
    payload: payment
});

