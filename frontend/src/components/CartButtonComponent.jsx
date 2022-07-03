import { Button, Tooltip, } from 'reactstrap';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CartButton extends Component {

    toggleTT() {
        this.setState({
            isTooltip: !this.state.isTooltip
        });
    }


    constructor(props) {
        super(props);
        this.state = {
            isTooltip: false,
        }
        this.toggleTT = this.toggleTT.bind(this);
    }

    toggle = () => setTooltipOpen(!tooltipOpen);


    render() {
        if(this.props.items != null) {
            const qty = this.props.items.map((itm) => itm.quantity)
            .reduce((total, q) => {
                return total + q;
            }, 0);
            return(
                <Link to={`/cart`}>
                    <Button className="btn btn-outline-white-primary">
                        <span className="fa fa-shopping-cart fa-lg" /> {"  "} {qty} {"  "} items
                    </Button>
                </Link>
            );
        }
        else if(this.props.isLoading){
            return (
                <Link to={`/cart`}>
                    <Button outline>    
                        <span className="fa fa-spinner fa-pulse fa-fw text-primary"></span>
                    </Button>
                </Link>
            );
        }
        else if(this.props.errMess != null) {
            return (
                <React.Fragment>
                    <Button id="errButt" outline onClick={this.doLogin} >
                        <span className="fa fa-error fa-lg" />Problem fetching cart
                    </Button>
                    <Tooltip placement="bottom" isOpen={this.state.isTooltip} target="errButt" toggle={this. toggleTT}>
                        {this.props.errMess}
                    </Tooltip>
                </React.Fragment>
            );
        }
        else{
            return (
                <div></div>
            );    
        }
    }


}

export default CartButton;  