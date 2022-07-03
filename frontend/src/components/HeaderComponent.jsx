import React, { Component, useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
            Button, Modal, ModalHeader, ModalBody,
            Form, FormGroup, Input, Label } from 'reactstrap';
import { } from 'reactstrap';            
import { NavLink } from 'react-router-dom';
import Select  from 'react-select';
import logo from '../img/logo.png';
import logoSmall from '../img/logo-small.png';
import Login from './LoginComponent';
import CartButtonComponent from './CartButtonComponent';

class Header extends Component {    


    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isCurrencyOpen: false,
            currencyOptions: [
                {"value": "USD", "label": "USD"},
                {"value": "YEN", "label": "YEN"},
                {"value": "DOGE", "label": "DOGE"}
            ]
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleCurrency = this.toggleCurrency.bind(this);   
    }


    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    toggleCurrency() {
        console.log("TOGGLE CURRENCY");
        this.setState({
            isCurrencyOpen: !this.state.isCurrencyOpen
        })
    }


    render() {
        return (
            <React.Fragment>
                <Navbar light fixed="top" expand="md" className="yamm justify-content-between">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}></NavbarToggler>
                        <NavbarBrand href="/">
                            <img className="d-none d-md-inline-block" src={logo} alt="Acme Fitness"/>
                            <img className="d-md-none" src={logoSmall} alt="Acme Fitness"/>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home" activeClassName="active"z>
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/catalog">
                                        <span className="fa fa-list fa-lg"></span> Catalog
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contact">
                                        <span className="fa fa-address-card fa-lg"></span> Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <div className="currency-area .d-sm-none .d-md-block">
                                    <select id="currency" className="form-control btn-outline-primary mr-1" defaultValue="USD">
                                        <option value="USD">USD</option>
                                        <option value="GBP">GBP</option>
                                        <option value="YEN">YEN</option>
                                    </select>
                                </div>
                            </Nav>
                            <Nav className="ml-1" navbar>
                                 <NavItem>
                                     <Login authClient={this.props.authClient}
                                            authClientIsLoading={this.props.authClientIsLoading}
                                            authClientErr={this.props.authClientErr}
                                            user={this.props.user}
                                            userErr={this.props.userErr}
                                            storeUser={this.props.storeUser}
                                            fetchCartItems={this.props.fetchCartItems}/>
                                 </NavItem>
                            </Nav>
                            <Nav className="ml-1" navbar>
                                <NavItem>
                                     <CartButtonComponent items={this.props.cartItems}
                                                            errMess={this.props.cartErr}
                                                            isLoading={this.props.cartLoading}  />
                                 </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Header;