import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import { Loading } from './LoadingComponent';
import ProductCarousel from './ProductCarouselComponent';

function RenderCarousel({catalogItems, loading, errMsg}) {
    if(loading) {
        return (
            <div className="box text-center">
                <Loading />
            </div>
        );
    }
    else if(errMsg != null) {
        return (
            <h4 className="text-danger">Unable to load catalog images: {errMsg}</h4>
        );
    }
    else if(catalogItems == null){
        return (
            <div></div>
        );
    }
    else{
        return (
            <ProductCarousel items={catalogItems} />
        );
    }
}


class  Home extends Component  {
    constructor(props) {
        super(props);
    }
    

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <RenderCarousel catalogItems={this.props.catalogItems}
                                            loading={this.props.catalogItemsLoading}
                                            errMsg={this.props.catalogItemsErrMess} />

                        </div>
                    </div>
                </div>

                <div id="all">
                    <div id="content">
                        <div className="container">
                            {/* <!-- *** ADVANTAGES ***--> */}
                            <div id="advantages">
                                <div className="box text-center">
                                    <h3 className="text-uppercase">About ACME Fitness</h3>

                                    <div className="same-height-row row">
                                        <div className="col-md-3 col-6 justify-content-md-center align-items-md-center">
                                            <div className="box no-border d-flex justify-content-center align-items-center">
                                                <div className="icon"><i className="fa fa-heart-o"></i></div>
                                                <h4><a>Satisfied customers</a></h4>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <div className="box no-border d-flex justify-content-center align-items-center">
                                                <div className="icon"><i className="fa fa-tags"></i></div>
                                                <h4><a>Best prices</a></h4>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <div className="box no-border d-flex justify-content-center align-items-center">
                                                <div className="icon"><i className="fa fa-send-o"></i></div>
                                                <h4><a>Next day delivery</a></h4>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <div className="box no-border d-flex justify-content-center align-items-center">
                                                <div className="icon"><i className="fa fa-refresh"></i></div>
                                                <h4><a href="contact.html">Free returns for 3 months</a></h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- /#advantages-->
          <!-- *** ADVANTAGES END ***--> */}
                            <div className="box text-center">
                                <h3 className="text-uppercase"><a href="catalog.html">New Arrivals</a></h3>
                                <h4 className="text-muted"><span className="accent">Free shipping</span> on all</h4>
                            </div>

                            {/* <!-- /.products--> */}
                        </div>
                        {/*         
        *** PROMO BAR ***
        _________________________________________________________
         */}
                        <div className="bar background-image-fixed-2 no-mb color-white text-center">
                            <div className="dark-mask"></div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="icon icon-lg"><i className="fa fa-file-code-o"></i></div>
                                        <h1>Do you want to explore more?</h1>
                                        <p className="lead">We keep updating our inventory with exciting new products !!</p>
                                        <p className="text-center"><a href="catalog.html" className="btn btn-outline-white-primary">FIND MORE IN CATALOG</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* *** PROMO BAR END *** */}
                    </div>
                </div>
            </React.Fragment>



        );    
    }

}

export default Home;