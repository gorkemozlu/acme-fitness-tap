import React, { Component } from 'react';
// import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
//             Button, Modal, ModalHeader, ModalBody,
//             Form, FormGroup, Input, Label } from 'reactstrap';
//import { } from 'reactstrap';            
// import { NavLink } from 'react-router-dom';
// import Select  from 'react-select';
import payment from "../img/payment.png"

class Footer extends Component {    


    constructor(props) {
        super(props);
    }




    render() {
        return (
            <React.Fragment>
                <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <h4>Pages</h4>
                            <ul>
                                <li><a href="text.html">About us</a></li>
                                <li><a href="text-left.html">Terms and conditions</a></li>
                                <li><a href="faq.html">FAQ</a></li>
                                <li><a href="contact.html">Contact us</a></li>
                            </ul>
                            <hr />
                            <h4>User section</h4>
                            <ul>
                                <li><a href="#" data-toggle="modal" data-target="#login-modal">Login</a></li>
                            </ul>
                            <hr className="d-block d-lg-none" />
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4>Where to find us</h4>
                            <p><strong>ACME Fitness</strong><br />5060 Fountain Ave<br />Los Angeles<br />California<br /><strong>USA</strong></p><a href="contact.html">Go to contact page</a>
                            <hr className="d-block d-md-none" />
                        </div>
                        {/* <!-- /.col-lg-3--> */}
                        <div className="col-lg-3 col-md-6">
                            <h4>Get the news</h4>
                            <p className="text-muted">What's new in the world of Fitness</p>
                            <form>
                                <div className="input-group">
                                    <input type="text" className="form-control" />
                                    <div className="input-group-append">
                                        <button type="button" className="btn btn-outline-secondary"><i className="fa fa-send"></i></button>
                                    </div>
                                </div>
                                    {/* <!-- /input-group--> */}
                            </form>
                            <hr />
                            <h4>Stay in touch</h4>
                            <p className="social"><a href="#"><i className="fa fa-facebook-square"></i></a><a href="#"><i className="fa fa-instagram"></i></a><a href="#"><i className="fa fa-envelope"></i></a></p>
                        </div>
                        {/* <!-- /.col-lg-3--> */}
                    </div>
                    {/* <!-- /.row--> */}
                </div>
                </div>

                <div id="copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-left">© {new Date().getFullYear()}  ACME Fitness <a href="index.html" className="external"></a></div>
                            <div className="col-md-6 text-center text-md-right"><img src={payment} alt="payments accepted" /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 text-center text-md-left"><strong>This website is for demo purposes only. It is not an actual e-commerce site.</strong></div>
                            <div className="col-md-6 text-center text-md-right"><strong>Many thanks to <a href="https://bootstrapious.com">Bootstrapious</a> for the original template.</strong></div>
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}

export default Footer;