import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardImgOverlay, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Map } from 'immutable';
import { useParams } from 'react-router-dom';
import { urlFix } from '../shared/urlFix';

function ProductCards({items}) {
  var cards = (
    items.map((item) => {
      return (
        <div key={item.id} className="col-md-3 col-sm-4 mb-3">
          <Card>
            <Link to={`/product/${item.id}`}>
              <CardImg width="100%" src={urlFix(item.imageUrl1)} alt={item.name} />
              <CardTitle className="text"><h3>{item.name}</h3></CardTitle>
              <CardText className="price">{item.price}</CardText>
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
            </Link>
          </Card>
        </div>
      );
    })
  );
  return (
    <div id="rowProducts" className="row products">
      {cards}
    </div>
  );
}



class Catalog extends Component  {

    constructor(props) {
        super(props);
    }

    render() {
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
        else if(this.props.catalogItems == null){
          return (
            <div></div>
          );
        }

        return (
          <React.Fragment>
            <div id="all">
              <div id="content">
                <div className="container">
                  <Breadcrumb className="d-flex justify-content-md-end justify-content-center ">
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Catalog  </BreadcrumbItem>
                  </Breadcrumb>

                  <div className="box text-center">
                    <div className="row">
                      <div className="col-md-10 offset-md-1">
                        <h1>Products</h1>
                        <p className="text-muted">
                          Best in Class Products to keep you fit
                        </p>
                      </div>
                    </div>
                    <div className="info-bar">
                      <div className="row">
                        <div className="col-lg-4 products-showing">Showing <strong>8</strong> of <strong>8</strong> products</div>
                        <div className="col-lg-8 products-number-sort">
                          <form className="form-inline"></form>
                          <div className="row">
                            <div className="col-6 col-lg-7">
                              <div className="products-number"><strong>Show</strong><a href="#" className="btn btn-sm btn-outline-primary mr-1">12</a> <a href="#" className="btn btn-outline-secondary btn-sm mr-1">24</a> <a href="#" className="btn btn-outline-secondary btn-sm mr-1">All</a> products</div>
                            </div>
                            <div className="col-6 col-lg-5">
                              <div className="products-sort-by d-flex justify-content-end"><strong>Sort by</strong>
                                <select name="sort-by" className="form-control form-control-sm">
                                  <option>Price</option>
                                  <option>Name</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ProductCards items={this.props.catalogItems}      />
                  </div>
                </div>
              </div>
            </div>

          </React.Fragment>
        );    
    }

}

export default Catalog;