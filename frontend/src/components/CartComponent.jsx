import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Card, CardImg, CardImgOverlay, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { Map } from 'immutable';
import { _ } from 'lodash';
import { urlFix } from '../shared/urlFix';


const LineItem = ({item, itemChange, remove, updateCart}) => {
  return (
    <div className="row mt-5" key={item.itemid}>
      <div className="col-1">
        <Link to={`/product/${item.itemid}`} >
          <img src={urlFix(item.cartImg)} />
        </Link>
      </div>
      <div className="col-2 align-middle">
        <Link to={`/product/${item.itemid}`}>
          <p className="mt-2">{item.name}</p>
        </Link>
      </div>
      <div className="col-2 align-middle">
        <input
          name={item.itemid}
          placeholder="0"
          type="number"
          style={{width: '4em'}}
          value={item.quantity}
          className="mt-2"
          onChange={itemChange}
        />
      </div>
      <div className="col-2 align-middle">
        <p className="mt-2">{item.price}</p>
      </div>
      <div className="col-2 align-middle">
        <p className="mt-2">$0.00</p>
      </div>
      <div className="col-2 align-middle">
        <p className="mt-2">{(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div className="col-1 align-middle">
        <button
          type="button"
          className="secondary"
          onClick={() =>
            {
              console.log("buttonclick");
              remove(item);
            }
          }
        >
          <span className="fa fa-trash-o"></span>
        </button>
      </div>
    </div>
  );
}

function buildCartMap(cartItems) {
  const ret = {}
  cartItems.forEach((item) => {
    ret[item.itemid] = item
  });
  return new Map(ret);
}


class Cart extends Component  {

    constructor(props) {
        super(props);
        this.totalFromProps = this.totalFromProps.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.updateAndProceed = this.updateAndProceed.bind(this);
        if(props.cartItems != null) {
          console.log("setting state in ctor");
          this.state = {cartMap: buildCartMap(props.cartItems)}
        }
        else{
          this.state = {}
        }
    }

    componentDidUpdate(prevProps, prevState) {
      console.log("CDU");
      if(prevProps.cartItems == null && this.props.cartItems != null) {
        console.log("Updating state in CDU");
        this.setState({cartMap: buildCartMap(this.props.cartItems)});
      }
    }

    updateCart = () => {
      console.log("updatecart");
      //this.props.fetchCartItems(this.props.authClient);
      this.props.postCartData(this.props.authToken, {cart: this.state.cartMap.valueSeq().toJS()});
    }

    updateAndProceed = (event) => {
      console.log("update and proceed");
      console.log(event);
      console.log("state")
      console.log(this.state)
      console.log("cartmap...")
      console.log(this.state.cartMap)
      event.preventDefault();
      console.log("cartmap-deser...")
      console.log(this.state.cartMap.valueSeq().toJS())
      this.props.postCartData(this.props.authToken, {cart: this.state.cartMap.valueSeq().toJS()})
      .then((ret) => {
        console.log("back from promise");
        console.log(ret);
        this.props.history.push("/checkout/address");
      });
    }

    totalFromProps = () => {
      var total = 0;
      this.props.cartItems.forEach((item) => {
        total += (Number(item.quantity) * Number(item.price));
      });
      return "$"+total.toFixed(2);
    }

    itemChange = (item) => (event) => {
      const prev = this.state.cartMap;
      const changedItem = _.cloneDeep(item);
      changedItem.quantity = event.target.value;
      const next = prev.set(item.itemid, changedItem);
      this.setState({cartMap: next});
    }

    remove = (item) => (event) => {
      console.log("remove");
      const prev = this.state.cartMap;
      const next = prev.remove(item.itemid);
      this.setState({cartMap: next}, this.updateCart);
    }

    render() {
      console.log("Render: ");
      console.log(this.props.cartItems);
      if(this.props.isLoading) {
        return (
          <div id="all">
            <div id="content">
              <div className="container">
                <Breadcrumb className="d-flex justify-content-md-end justify-content-center ">
                  <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                  <BreadcrumbItem active>Cart</BreadcrumbItem>
                </Breadcrumb>
                <div className="box text-center">
                  <Loading />
                </div>
              </div>
            </div>
          </div>

        );
      }
      else if(this.props.errMess != null) {
        return(
          <div id="all">
            <div id="content">
              <div className="container">
                <Breadcrumb className="d-flex justify-content-md-end justify-content-center ">
                  <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                  <BreadcrumbItem active>Cart  </BreadcrumbItem>
                </Breadcrumb>
                <h4 className="text-danger">Error loading cart: {this.props.errMess}</h4>
              </div>
            </div>
          </div>
        );
      }
      else if(this.props.cartItems == null){
        return (
          <div id="all">
          <div id="content">
            <div className="container">
              <Breadcrumb className="d-flex justify-content-md-end justify-content-center ">
                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Cart  </BreadcrumbItem>
              </Breadcrumb>
              <div></div>
            </div>
          </div>
          </div>
        );
      }

      var lineItems = null;

      if(this.state.cartMap != null) {
        lineItems = this.state.cartMap.entrySeq().map(([itemid, item], index) => {
          return (
            <LineItem key={itemid} item={item} itemChange={this.itemChange(item)} remove={this.remove(item)} updateCart={this.updateCart}/>
          );
        });
      }


      return (

        <React.Fragment>
          <div id="all">
            <div id="content">
              <div className="container">
                <Breadcrumb className="d-flex justify-content-md-end justify-content-center ">
                  <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                  <BreadcrumbItem active>Cart  </BreadcrumbItem>
                </Breadcrumb>
                <div className="box text-center">
                  <div className="row">
                    <div className="col-md-10 offset-md-1">
                      <h1>Your Shopping cart awaits! </h1>
                      <p className="text-muted"><strong id="cartText" ></strong></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div id="basket" className="col-lg-9">
                    <div className="box">
                      <div className="table-responsive">
                            <div id="table-outer">

                                <div className="row">
                                  <div className="col-3"><strong>Item</strong></div>
                                  <div className="col-2"><strong>Quantity</strong></div>
                                  <div className="col-2"><strong>Unit price</strong></div>
                                  <div className="col-2"><strong>Discount</strong></div>
                                  <div className="col-3"><strong>Total</strong></div>
                                </div>


                                {lineItems}

                          </div>
                      </div>
                        <div className="box-footer">
                          <div className="row">
                            <div className="col-4">
                              <Link to="/catalog">
                                <Button className="btn btn-outline-white-secondary text-left">
                                  <i className="fa fa-chevron-left"></i>
                                  Continue shopping
                                </Button>
                              </Link>
                            </div>
                            <div className="col-4 text-center">
                              <Button className="btn btn-outline-white-secondary text-center" onClick={() => this.updateCart()}>
                                <i className="fa fa-chevron-up"></i>
                                Update Total
                              </Button>
                            </div>
                            <div className="col-4">
                              <Button className="btn btn-outline-white-primary text-right" onClick={this.updateAndProceed}>
                                  Proceed to checkout<i className="fa fa-chevron-right"></i>
                              </Button>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div id="order-summary" className="box">
                      <div className="box-header">
                        <h3>Order summary</h3>
                      </div>
                      <p className="text-muted">Shipping and additional costs are calculated based on the values you have entered.</p>
                      <div className="table-responsive">
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>Order subtotal</td>
                              <th>{this.totalFromProps()}</th>
                            </tr>
                            <tr>
                              <td>Shipping and handling</td>
                              <th>$0.00</th>
                            </tr>
                            <tr>
                              <td>Tax</td>
                              <th>$0.00</th>
                            </tr>
                            <tr className="total">
                              <td>Total</td>
                              <th>{this.totalFromProps()}</th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="box">
                      <div className="box-header">
                        <h4>Coupon code</h4>
                      </div>
                      <p className="text-muted">If you have a coupon code, please enter it in the box below.</p>
                      <form>
                        <div className="input-group">
                          <input type="text" className="form-control" />
                          <div className="input-group-append">
                            <button type="button" className="btn btn-outline-primary"> <i className="fa fa-gift"></i></button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }

}

export default Cart;
