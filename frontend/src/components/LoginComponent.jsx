import { Button, DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import React, { Component } from 'react';
import { NavLink as RouterNavLink } from "react-router-dom";


class Login extends Component {

    constructor(props) {
        super(props);
        this.doLogin = this.doLogin.bind(this);
    }

    doLogin() {
        console.log("do login");
        this.props.authClient.loginWithPopup()
        .then(() => {
            this.props.authClient.getUser()
            .then((user) => {
                console.log("post-login got user: ");
                console.log(user);
                this.props.storeUser(user);
                this.props.fetchCartItems(this.props.authClient);
            });
        });
    }

    render() {
        if(this.props.user != null) {
            return(
                <React.Fragment>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret id="profileDropDown">
                            <img
                            src={this.props.user.picture}
                            alt="Profile"
                            className="nav-user-profile rounded-circle"
                            width="50"
                            />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>{this.props.user.name}</DropdownItem>
                            <DropdownItem
                            tag={RouterNavLink}
                            to="/profile"
                            className="dropdown-profile"
                            activeClassName="router-link-exact-active"
                            >
                                <span className="fa fa-user mr-3" /> Profile
                            </DropdownItem>
                            <DropdownItem
                                id="qsLogoutBtn"
                                onClick={() => this.props.authClient.logout()}
                            >
                                <span className="fa fa-power-off mr-3" />Log out
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>                    
                </React.Fragment>
            );
        }
        else if(this.props.authClientIsLoading){
            return (
                <Button outline>
                    <span className="fa fa-spinner fa-pulse fa-fw text-primary"></span>
                </Button>
            );
        }
        else if(this.props.authClient != null) {
            return (
                <Button outline onClick={this.doLogin}>
                    <span className="fa fa-sign-in fa-lg" />Login
                </Button>
            );
        }
        else{
            return (
                <Button outline >
                    <span className="fa fa-sign-in fa-lg" /><p className="text-danger">Unable to reach Login Provider</p>
                </Button>
            );    
        }
    }


}

export default Login;