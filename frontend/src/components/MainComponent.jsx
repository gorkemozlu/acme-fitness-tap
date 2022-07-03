import React, { Component } from 'react';
// import Menu from './MenuComponent';
// import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
// import Footer from './FooterComponent';
import Home from './HomeComponent';
import Catalog from './CatalogComponent';
import Contact from './ContactComponent';
import ProductDetail from  './ProductDetailComponent';
// import Contact from './ContactComponent';
// import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postContactForm, fetchCartItems, fetchCatalogItems, 
        fetchAuthClient, storeUser, postCartData, setAddress, 
        setDelivery, setPayment, postOrder} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ProfileComponent from './ProfileComponent';
import Cart from './CartComponent';
import Checkout from './CheckoutComponent';
import Transaction from './TransactionComponent';

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems, 
    catalogItems: state.catalogItems,
    authClient: state.authClient,
    user: state.user,
    authToken: state.authToken,
    checkout: state.checkout,
    order: state.order,
  }
};

const mapDispatchToProps = (dispatch) => ({
  postContactForm: (firstname, lastname, telnum, email, agree, contectType, message) => dispatch(postContactForm(firstname, lastname, telnum, email, agree, contectType, message)),
  fetchCartItems: (authClient)  => dispatch(fetchCartItems(authClient)),
  postCartData: (authToken, values) => dispatch(postCartData(authToken, values)),
  fetchCatalogItems: (authClient)  => dispatch(fetchCatalogItems(authClient)),
  resetContactForm: () => dispatch(actions.reset('contact')),
  fetchAuthClient: () => dispatch(fetchAuthClient()),
  storeUser: (user) => dispatch(storeUser(user)),
  setAddress: (address) => dispatch(setAddress(address)),
  setDelivery: (delivery) => dispatch(setDelivery(delivery)),
  setPayment: (payment) => dispatch(setPayment(payment)),
  postOrder: (payload, authToken, callback) => dispatch(postOrder(payload, authToken, callback)),
});


class Main extends Component {

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    // this.props.fetchCartItems();
    this.props.fetchCatalogItems();
    this.props.fetchAuthClient();
  }

  render() {
    const HomePage = () => {
      return (
        <Home catalogItems={this.props.catalogItems.catalogItems}
              catalogItemsLoading={this.props.catalogItems.isLoading}
              catalogItemsErrMess={this.props.catalogItems.errMess}
          />
      );
    };

    const CatalogPage = () => {
      return (
        <Catalog isLoading={this.props.catalogItems.isLoading} 
                  errMess={this.props.catalogItems.errMess}
                  catalogItems={this.props.catalogItems.catalogItems}
                  cartItems={this.props.cartItems.cartItems}
                  postCartData={this.props.postCartData}
        />
      );
    };

    const CartPage = ({history}) => {
      return (
        <Cart isLoading={this.props.cartItems.isLoading} 
                  errMess={this.props.cartItems.errMess}
                  cartItems={this.props.cartItems.cartItems}
                  postCartData={this.props.postCartData}
                  fetchCartItems={this.props.fetchCartItems}
                  authToken={this.props.authToken.authToken}
                  history={history}
        />
      );
    };    

    const ProdWithId = ({match}) => {

      return (
        <ProductDetail 
          item={this.props.catalogItems.catalogItems.filter((ci) => ci.id === match.params.productId)[0]}
          isLoading={this.props.catalogItems.isLoading}
          errMess={this.props.catalogItems.errMess}
          authToken={this.props.authToken.authToken}
          postCartData={this.props.postCartData}
          cartItems={this.props.cartItems} />
      );
    };

    const ProfilePage = () => {
      return (
        <ProfileComponent user={this.props.user.user} 
            authClient={this.props.authClient.authClient} 
        />
      );
    };

    const CheckoutPage = ({match, history}) => {
      return (
        <Checkout tabUrl={match.url} 
                address={this.props.checkout.address} 
                delivery={this.props.checkout.delivery} 
                payment={this.props.checkout.payment}
                setAddress={this.props.setAddress} 
                setDelivery={this.props.setDelivery}
                setPayment={this.props.setPayment}
                cartItems={this.props.cartItems.cartItems}
                history={history}
                postOrder={this.props.postOrder}
                authToken={this.props.authToken.authToken} />
      );
      
    }

    const TransactionPage = () => {
      return (
        <Transaction isLoading={this.props.order.isLoading}
                    errMess={this.props.order.errMess} />
      );
    }

    return (
        <div className="App">
          <Header authClient={this.props.authClient.authClient} 
                  authClientIsLoading={this.props.authClient.isLoading}
                  authClientErr={this.props.authClient.errMess}
                  user={this.props.user.user}
                  userErr={this.props.user.errMess} 
                  storeUser={this.props.storeUser}
                  fetchCartItems={this.props.fetchCartItems}
                  cartLoading={this.props.cartItems.isLoading}
                  cartErr={this.props.cartItems.errMess}
                  cartItems={this.props.cartItems.cartItems}/>
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch>
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/catalog" component={CatalogPage} />
                <Route exact path="/contact" component={Contact} />
                <Route path="/product-:productId" component={ProdWithId} />
                <Route path="/product/:productId" component={ProdWithId} />
                <Route exact path="/profile" component={ProfilePage} />
                <Route exact path="/cart" render={(props) => <CartPage {...props} />} />
                <Route exact path="/checkout/address" component={CheckoutPage} />
                <Route exact path="/checkout/delivery" component={CheckoutPage} />
                <Route exact path="/checkout/payment" component={CheckoutPage} />
                <Route exact path="/checkout/review" component={CheckoutPage} />
                <Route exact path="/transaction" component={TransactionPage} />
                {/* <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes }/>} />
                <Route path="/menu/:dishId" component={this.DishWithId} />
                <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} /> } />
                <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} /> */}
                <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          <Footer />
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
