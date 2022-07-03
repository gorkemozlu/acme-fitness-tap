import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { connect } from 'react-redux';
import { postCartData } from '../redux/ActionCreators';
import { _ } from 'lodash';
import { urlFix } from '../shared/urlFix';


const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems, 
  }
}

const mapDispatchToProps = (dispatch) => ({
  postCartData: (authToken, values) => dispatch(postCartData(authToken, values)),
});


class  ProductDetail extends Component  {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
      }

    addToCart() {
      var newCart = this.props.cartItems.cartItems;
      console.log("new cart");
      console.log(newCart);
      if(newCart == null) {
        newCart = [];
      }
      for(var i = 0; i < newCart.length; i++){
        var ci = newCart[i];
        if(ci.itemid === this.props.item.id) {
          ci.quantity = ci.quantity + 1
          this.props.postCartData(this.props.authToken, {cart: newCart});
          return;
        }
      }
      newCart.push({
          itemid: this.props.item.id, 
          name: this.props.item.name, 
          price: this.props.item.price, 
          quantity: 1, 
          shortDescription: this.props.item.shortDescription,
          cartImg: this.props.item.imageUrl5,
      });
      this.props.postCartData(this.props.authToken, {cart: newCart});      
    }
    
    render() {

      console.log("Prod detail");
      console.log(this.props);

      const ProductCard = () => {
        const item = this.props.item;
        var ret = (
            <Card>
                  <CardImg width="100%" src={urlFix(item.imageUrl1)} alt={item.name} />
                  <div className="ribbon new">
                        <div className="theribbon">NEW</div>
                        <div className="ribbon-background"></div>
                  </div>
                  <div className="ribbon sale">
                        <div className="theribbon">SALE</div>
                        <div className="ribbon-background"></div>
                  </div>
                  <div className="ribbon gift">
                        <div className="theribbon">GIFT</div>
                        <div className="ribbon-background"></div>
                  </div>                    
            </Card>
        );
        return ret;
      }

      if(this.props.isLoading) {
        return (
          <div className="box text-center">
            <Loading />
          </div>
        );
      }
      else if(this.props.errMess != null) {
        return(
          <div className="container">
            <div className="row">
              <h4 className="text-danger">Error loading products: {this.props.errMess}</h4>
            </div>
          </div>
        );  
      }
      else if(this.props.item == null) {
        return(
          <div></div>
        );
      }

        return (

          <React.Fragment>
            <div id="all">
              <div id="content">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <Breadcrumb className="d-flex justify-content-md-end justify-content-center ">
                        <BreadcrumbItem><Link to='/catalog'>Catalog</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.item.name}</BreadcrumbItem>
                      </Breadcrumb>
                    </div>
                  </div>
                  <div className="box text-center">
                    <div className="row">
                      <div className="col-md-10 offset-md-1">
                        <h1 id="productTitle">{this.props.item.name}</h1>
                        <p className="text-muted" id="descriptionTitle">
                          {this.props.item.shortDescription}
                        </p>
                        <p className="goToDescription"><a href="#details" className="scroll-to">Scroll to product details</a></p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-9">
                      <div id="productMain" className="row">
                        <div className="col-md-6">
                          <ProductCard />
                        </div>
                        <div className="col-md-6">
                          <div className="box">
                            <div className="sizes">
                              <h3>Available Now</h3>
                            </div>
                            <p id="productPrice" className="price">{this.props.item.price}</p>
                            <p className="text-center">
                              {this.props.cartItems.isLoading &&
                                <Loading />
                              }
                              {
                                this.props.cartItems.errMess != null && 
                                <span className="text-danger">Error loading cart: {this.props.cartItems.errMess}</span>
                              }
                              {
                                this.props.cartItems.cartItems != null &&
                                <button id="addToCart" className="btn btn-primary" onClick={this.addToCart}><i className="fa fa-shopping-cart"></i> Add to cart</button>                                  
                              }

                              <button data-toggle="tooltip" data-placement="top" title="Add to wishlist" className="btn btn-outline-secondary"><i className="fa fa-heart-o"></i></button>
                            </p>
                          </div>
                          <div id="thumbs" className="row">
                            <div className="col-4"><a href="#" className="thumb"><img id="thumbImg1" src={urlFix(this.props.item.imageUrl2)} alt={this.props.item.name} className="img-fluid" /></a></div>
                            <div className="col-4"><a href="#" className="thumb"><img id="thumbImg2" src={urlFix(this.props.item.imageUrl3)} alt={this.props.item.name} className="img-fluid" /></a></div>
                            <div className="col-4"><a href="#" className="thumb"><img id="thumbImg3" src={urlFix(this.props.item.imageUrl4)} alt={this.props.item.name} className="img-fluid" /></a></div>
                          </div>
                        </div>
                      </div>

                      <div id="details" className="box">
                        <p></p>
                        <h4>Product details</h4>
                        <p id="detailedDescription">{this.props.item.description}</p>
                        <blockquote>
                          <p><em>
                            Stay Fit with ACME Fitness</em></p>
                        </blockquote>
                      </div>
                      <div id="product-social" className="box social">
                        <h4>Show it to your friends</h4>
                        <p><a href="#" data-animate-hover="pulse" className="external facebook"><i className="fa fa-facebook"></i></a><a href="#" data-animate-hover="pulse" className="external twitter"><i className="fa fa-twitter"></i></a><a href="#" data-animate-hover="pulse" className="email"><i className="fa fa-envelope"></i></a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);