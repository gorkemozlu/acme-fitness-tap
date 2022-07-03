import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Card, CardImg, CardImgOverlay, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';



class Transaction extends Component  {

    constructor(props) {
        super(props);
    }

    render() {
      if(this.props.isLoading) {
        return (
          <div id="all">
            <div id="content">
              <div className="container">
                <Breadcrumb className="d-flex justify-content-md-end justify-content-center ">
                  <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                  <BreadcrumbItem active>Order Loading</BreadcrumbItem>
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
                  <BreadcrumbItem active>Order Error  </BreadcrumbItem>
                </Breadcrumb>
                <h4 className="text-danger">Error submitting order: {this.props.errMess}</h4>
                <Link to="/checkout/address" className="text-danger">
                  <p className="text-danger">Back to Checkout.</p>
                </Link>
              </div> 
            </div>
          </div>
        );
      }
      else {
        return (
          <div id="all">
          <div id="content">
            <div className="container">
              <Breadcrumb className="d-flex justify-content-md-end justify-content-center ">
                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Order Success  </BreadcrumbItem>
              </Breadcrumb>
              <div>
                <p className="text-success">Your order was successfully processed!  Thanks for staying fit with Acme Fitness!</p>
                <Link to="/catalog">
                  <p>Back to Shopping!  </p>
                </Link>
              </div>
            </div>
          </div>
          </div>
        );
      }
    }

}

export default Transaction;