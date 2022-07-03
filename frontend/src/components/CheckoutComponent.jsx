import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Nav, NavItem } from 'reactstrap';
import { Map } from 'immutable';
import Select from 'react-select';
import { urlFix } from '../shared/urlFix';


class CheckoutDelivery extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.itemChange = this.itemChange.bind(this);
    this.updateAndProceed = this.updateAndProceed.bind(this);    

    this.state = {
      delivery: this.props.delivery
    }

  }

  itemChange = (val) => (event) => {
    console.log("item change")
    console.log(val)
    this.setState({delivery: val});
  }

  updateAndProceed = (dest) => (event) => {
    console.log("update and proceed");
    console.log(event);
    console.log(dest);
    event.preventDefault();
    this.props.setDelivery(this.state.delivery);
    this.props.history.push(dest);
  }

  render() {
    return (

      <React.Fragment>
        <div className="content">

        <div className="row">
          <div className="col-md-6">
            <div className="box shipping-method">
              <h4>Sean's Tractor</h4>
              <p>Get it slowly, but with a free strip of freshly cut grass ... or other surface</p>
              <div className="box-footer text-center">
                <input type="radio" name="delivery" value="tractor" checked={this.state.delivery === "tractor" } onChange={this.itemChange("tractor")} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="box shipping-method">
              <h4>Rob's 2011 Honda Element</h4>
              <p>Generally faster unless the temp is below 55deg Farenheit, in which case it won't be arriving until the LA Spring thaw.</p>
              <div className="box-footer text-center">
                <input type="radio" name="delivery" value="element" checked={this.state.delivery !== "tractor"} onChange={this.itemChange("element")}/>
              </div>
            </div>
          </div>
        </div>

        </div>
        <div className="box-footer">
          <div className="row">

            <div className="col-4">
              <Button className="btn btn-outline-white-primary text-right" onClick={this.updateAndProceed("/checkout/address")}>
                <i className="fa fa-chevron-left"></i>Back to Address
              </Button>
            </div>
            <div className="col-4 offset-4">
              <Button className="btn btn-outline-white-primary text-right" onClick={this.updateAndProceed("/checkout/payment")}>
                Payment Options<i className="fa fa-chevron-right"></i>
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>

    );
  }
}


const monthOptions = [
  { value: "01", label: "01" },
  { value: "02", label: "02" },
  { value: "03", label: "03" },
  { value: "04", label: "04" },
  { value: "05", label: "05" },
  { value: "06", label: "06" },
  { value: "07", label: "07" },
  { value: "08", label: "08" },
  { value: "09", label: "09" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
];

const yearOptions = [
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
  { value: "2027", label: "2027" },
  { value: "2028", label: "2028" },
  { value: "2029", label: "2029" },
];

const cardTypeOptions = [
  {value: "amex", label : "American Express"},
  {value: "mc", label : "Mastercard"},
  {value: "visa", label : "Visa"},
]



class CheckoutPayment extends Component {

  constructor(props) {
    super(props);
    this.itemChange = this.itemChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.updateAndProceed = this.updateAndProceed.bind(this);

    this.state = {
      payment: this.props.payment
    };

  }


  itemChange = (event) => {
    console.log("item change")
    const prev = this.state.payment;
    const property = event.target.name;
    const newValue = event.target.value;
    const next = new Map(prev).set(property, newValue).toJS();
    console.log(next);
    this.setState({payment: next});
  }

  selectChange = (fieldName) => (value) => {
    console.log("select change")
    const prev = this.state.payment;
    const property = fieldName;
    const newValue = value;
    const next = new Map(prev).set(property, newValue).toJS();
    console.log(next);
    this.setState({payment: next});
  }

  updateAndProceed = (dest) => (event) => {
    console.log("update and proceed");
    console.log(event);
    console.log(dest);
    event.preventDefault();
    this.props.setPayment(this.state.payment);
    this.props.history.push(dest);
  }




  render() {
    return (
      <React.Fragment>
        <div className="content">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="cardtype">Card Type</label>
                <Select name="cardtype" options={cardTypeOptions} onChange={this.selectChange("cardtype")} value={this.props.payment.cardtype}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="cardnum">Credit Card Number</label>
                <input name="cardnum" type="text" className="form-control" 
                        onChange={this.itemChange} 
                        defaultValue={this.props.payment.cardnum}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="ccv">CCV</label>
              <input name="ccv" type="text" className="form-control" 
                      onChange={this.itemChange} 
                      defaultValue={this.props.payment.ccv}/>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="form-group">
              <label htmlFor="expmonth">Expiration Month</label>
              <Select name="expmonth" options={monthOptions} onChange={this.selectChange("expmonth")} value={this.props.payment.expmonth}/>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="form-group">
              <label htmlFor="expyear">Expiration Year</label>
              <Select name="expyear" options={yearOptions} onChange={this.selectChange("expyear")} value={this.props.payment.expyear}/>
            </div>
          </div>
        </div>
        <div className="box-footer">
          <div className="row">

            <div className="col-4">
              <Button className="btn btn-outline-white-primary text-right" onClick={this.updateAndProceed("/checkout/delivery")}>
                <i className="fa fa-chevron-left"></i>Back to Delivery
              </Button>
            </div>
            <div className="col-4 offset-4">
              <Button className="btn btn-outline-white-primary text-right" onClick={this.updateAndProceed("/checkout/review")}>
                Review Order<i className="fa fa-chevron-right"></i>
              </Button>
            </div>
          </div>
        </div>

      </React.Fragment>


    );
  }
}

const LineItem = ({item}) => {
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
        <p className="mt-2">{item.quantity}</p>
      </div>
      <div className="col-2 align-middle">
        <p className="mt-2">{item.price}</p>
      </div>
      <div className="col-2 align-middle">
        <p className="mt-2">$0.00</p>
      </div>
      <div className="col-3 align-middle">
        <p className="mt-2">{(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
}


class CheckoutReview extends Component {

  constructor(props){
    super(props);
    this.submitOrder = this.submitOrder.bind(this);
    this.totalFromProps = this.totalFromProps.bind(this);
    this.rawTotalFromProps = this.rawTotalFromProps.bind(this);
  }

  totalFromProps = () => {
    const total = this.rawTotalFromProps();
    return "$"+total.toFixed(2);
  }

  rawTotalFromProps = () => {
    var total = 0;
    if(this.props.cartItems != null){
      this.props.cartItems.forEach((item) => {
        total += (Number(item.quantity) * Number(item.price));
      });  
    }
    return total;
  }


  submitOrder = (event) => {
    event.preventDefault();
    const checkout={address: this.props.address, payment: this.props.payment, delivery: this.props.delivery};
    const card = {number: this.props.payment.cardnum, expYear: this.props.payment.expyear.value, expMonth: this.props.payment.expmonth.value, ccv: this.props.payment.ccv}
    const total = this.rawTotalFromProps();
    const firstname = this.props.address.firstname;
    const lastname = this.props.address.lastname;
    const payload = {card: card, total: total, firstname: firstname, lastname: lastname, address: this.props.address};
    this.props.postOrder(payload, this.props.authToken, () => {this.props.history.push("/transaction");});
  }

  render() {

    var lineItems = null;
      
    if(this.props.cartItems != null) {
      lineItems = this.props.cartItems.map((item, index) => {
        return (
          <LineItem key={item.itemid} item={item}/>
        );     
      });
    } 



    return (
      <React.Fragment>
        <div className="content">
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

                      <div className="row mt-2">
                        <div className="col">
                          <hr />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3"><strong>Total</strong></div>
                        <div className="col-3 offset-6"><strong>{this.totalFromProps()}</strong></div>
                      </div>

                </div>
            </div>
          </div>
          <div className="box-footer">
            <div className="row">
              <div className="col-4">
                <Link to="/checkout/payment">
                  <Button className="btn btn-outline-white-primary text-right">
                    <i className="fa fa-chevron-left"></i>Back to Payment
                  </Button>
                </Link> 
              </div>
              <div className="col-4 offset-4">
                <Button className="btn btn-outline-white-primary text-right" onClick={this.submitOrder}>
                  Submit Order<i className="fa fa-chevron-right"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const states = [
  { value: "AL", label: "Alabama"},
                  { value: "AK", label: "Alaska"},
                  { value: "AZ", label: "Arizona"},
                  { value: "AR", label: "Arkansas"},
                  { value: "CA", label: "California"},
                  { value: "CO", label: "Colorado"},
                  { value: "CT", label: "Connecticut"},
                  { value: "DE", label: "Delaware"},
                  { value: "DC", label: "District Of Columbia"},
                  { value: "FL", label: "Florida"},
                  { value: "GA", label: "Georgia"},
                  { value: "HI", label: "Hawaii"},
                  { value: "ID", label: "Idaho"},
                  { value: "IL", label: "Illinois"},
                  { value: "IN", label: "Indiana"},
                  { value: "IA", label: "Iowa"},
                  { value: "KS", label: "Kansas"},
                  { value: "KY", label: "Kentucky"},
                  { value: "LA", label: "Louisiana"},
                  { value: "ME", label: "Maine"},
                  { value: "MD", label: "Maryland"},
                  { value: "MA", label: "Massachusetts"},
                  { value: "MI", label: "Michigan"},
                  { value: "MN", label: "Minnesota"},
                  { value: "MS", label: "Mississippi"},
                  { value: "MO", label: "Missouri"},
                  { value: "MT", label: "Montana"},
                  { value: "NE", label: "Nebraska"},
                  { value: "NV", label: "Nevada"},
                  { value: "NH", label: "New Hampshire"},
                  { value: "NJ", label: "New Jersey"},
                  { value: "NM", label: "New Mexico"},
                  { value: "NY", label: "New York"},
                  { value: "NC", label: "North Carolina"},
                  { value: "ND", label: "North Dakota"},
                  { value: "OH", label: "Ohio"},
                  { value: "OK", label: "Oklahoma"},
                  { value: "OR", label: "Oregon"},
                  { value: "PA", label: "Pennsylvania"},
                  { value: "RI", label: "Rhode Island"},
                  { value: "SC", label: "South Carolina"},
                  { value: "SD", label: "South Dakota"},
                  { value: "TN", label: "Tennessee"},
                  { value: "TX", label: "Texas"},
                  { value: "UT", label: "Utah"},
                  { value: "VT", label: "Vermont"},
                  { value: "VA", label: "Virginia"},
                  { value: "WA", label: "Washington"},
                  { value: "WV", label: "West Virginia"},
                  { value: "WI", label: "Wisconsin"},
                  { value: "WY", label: "Wyoming"},
];


class CheckoutAddress extends Component {

  constructor(props) {
    console.log("Address CTOR");
    super(props);
    this.state = {
      address: this.props.address
    }
    this.itemChange = this.itemChange.bind(this);
    this.updateAndProceed = this.updateAndProceed.bind(this);
    this.selectChange = this.selectChange.bind(this);
  }

  itemChange = (event) => {
    console.log("item change")
    const prev = this.state.address;
    const property = event.target.name;
    const newValue = event.target.value;
    const next = new Map(prev).set(property, newValue).toJS();
    console.log(next);
    this.setState({address: next});
  }

  selectChange = (fieldName) => (value) => {
    console.log("serlect change")
    const prev = this.state.address;
    const property = fieldName;
    const newValue = value;
    const next = new Map(prev).set(property, newValue).toJS();
    console.log(next);
    this.setState({address: next});
  }

  updateAndProceed = (dest) => (event) => {
    console.log("update and proceed");
    console.log(event);
    console.log(dest);
    event.preventDefault();
    this.props.setAddress(this.state.address);
    this.props.history.push(dest);
  }

  




  render() {
    return (
      <React.Fragment>
        <div className="content">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="firstname">Firstname</label>
                <input name="firstname" type="text" 
                      className="form-control" 
                      onChange={this.itemChange} 
                      defaultValue={this.props.address.firstname}  />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="lastname">Lastname</label>
                <input name="lastname" type="text" className="form-control" 
                          onChange={this.itemChange} 
                          defaultValue={this.props.address.lastname}/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input name="company" type="text" className="form-control" 
                  onChange={this.itemChange} 
                  defaultValue={this.props.address.company} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="street">Street</label>
                <input name="street" type="text" className="form-control" 
                        onChange={this.itemChange} 
                        defaultValue={this.props.address.street}/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input name="city" type="text" className="form-control"
                      onChange={this.itemChange} 
                      defaultValue={this.props.address.city} />
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="form-group">
                <label htmlFor="zip">ZIP</label>
                <input name="zip" type="text" className="form-control" 
                        onChange={this.itemChange} 
                        defaultValue={this.props.address.zip}/>
              </div>
            </div>


            <div className="col-md-6 col-lg-3">
              <div className="form-group">
                <label htmlFor="state">State</label>
                <Select name="state" options={states} onChange={this.selectChange("state")} value={this.props.address.state}/>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select id="country" className="form-control">
                  <option value="USA">USA</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="phone">Telephone</label>
                <input name="phone" type="text" className="form-control" 
                      onChange={this.itemChange} 
                      defaultValue={this.props.address.phone}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input name="email" type="text" className="form-control"
                      onChange={this.itemChange} 
                      defaultValue={this.props.address.email} />
              </div>
            </div>
          </div>

        </div>
        <div className="box-footer">
          <div className="row">
            <div className="col-4">
                <Button className="btn btn-outline-white-primary text-left" onClick={this.updateAndProceed("/catalog")}>
                  <i className="fa fa-chevron-left"></i>
                                  Continue Shopping
                </Button>
            </div>
            <div className="col-4 offset-4">
              <Button className="btn btn-outline-white-primary text-right" onClick={this.updateAndProceed("/checkout/delivery")}>
                Choose Delivery Method<i className="fa fa-chevron-right"></i>
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }


}




class Checkout extends Component  {

    constructor(props) {
        super(props);
        console.log("checkout CTOR");
        console.log(props.address);
    }


    updatePayment = (payment) => {
      this.setState({...this.state, localPayment: payment});
    }

    totalFromProps = () => {
      var total = 0;
      if(this.props.cartItems != null){
        this.props.cartItems.forEach((item) => {
          total += (Number(item.quantity) * Number(item.price));
        });  
      }
      return "$"+total.toFixed(2);
    }


    render() {

      return (
        
        <div id="content">
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <Breadcrumb className="d-flex justify-content-md-end justify-content-center ">                  
                  <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                  {this.props.tabUrl === '/checkout/address' &&
                    <BreadcrumbItem active>Checkout - Address</BreadcrumbItem>
                  }
                  {this.props.tabUrl === '/checkout/delivery' &&
                    <BreadcrumbItem active>Checkout - Delivery</BreadcrumbItem>
                  }
                  {this.props.tabUrl === '/checkout/payment' &&
                    <BreadcrumbItem active>Checkout - Payment</BreadcrumbItem>
                  }
                  {this.props.tabUrl === '/checkout/review' &&
                    <BreadcrumbItem active>Checkout - Review</BreadcrumbItem>
                  }
                </Breadcrumb>
              </div>
            </div>
            <div className="box text-center">
              <div className="row">
                <div className="col-md-10 offset-md-1">
                  <h1>Checkout - Address</h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div id="checkout" className="col-lg-9">
                <div className="box">
                  <Nav pills={true} fill={true}>
                    <NavItem>
                      <NavLink className="nav-link" to="/checkout/address"><i className="fa fa-map-marker"></i><br />Address</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to="/checkout/delivery"><i className="fa fa-truck"></i><br />Delivery Method</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to="/checkout/payment"><i className="fa fa-money"></i><br />Payment Method</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to="/checkout/review"><i className="fa fa-eye"></i><br />Order Review</NavLink>
                    </NavItem>
                  </Nav>
                  {this.props.tabUrl === '/checkout/address' &&
                    <CheckoutAddress address={this.props.address} 
                                    setAddress={this.props.setAddress}
                                    history={this.props.history} />
                  }
                  {this.props.tabUrl === '/checkout/delivery' &&
                    <CheckoutDelivery delivery={this.props.delivery}
                                      setDelivery={this.props.setDelivery}
                                      history={this.props.history} />
                  }
                  {this.props.tabUrl === '/checkout/payment' &&
                    <CheckoutPayment payment={this.props.payment}
                                      setPayment={this.props.setPayment}
                                      history={this.props.history}/>
                  }
                  {this.props.tabUrl === '/checkout/review' &&
                    <CheckoutReview cartItems={this.props.cartItems}
                                    history={this.props.history}
                                    postOrder={this.props.postOrder}
                                    address={this.props.address}
                                    delivery={this.props.delivery}
                                    payment={this.props.payment}
                                    authToken={this.props.authToken}
                                    />
                  }
                </div>
              </div>

              <div className="col-lg-3">
                <div id="order-summary" className="box">
                  <div className="box-header">
                    <h3>Order Summary</h3>
                  </div>
                  <p className="text-muted">Shipping and additional costs may vary</p>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>Order subtotal</td>
                          <th id="orderSubtotal">{this.totalFromProps()}</th>
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
                          <th id="orderTotal">{this.totalFromProps()}</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      );
    }

}

export default Checkout;