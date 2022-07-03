import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';


class  Contact extends Component  {
    constructor(props) {
        super(props);
      }
    
    componentDidMount() {
    }

    render() {
        return (
          <React.Fragment>
            <div id="all">
              <div id="content">
                <div className="container">
                  <Breadcrumb className="d-flex justify-content-md-end justify-content-center ">
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="box text-center">
                    <div className="row">
                      <div className="col-md-10 offset-md-1">
                        <h1>Contact</h1>
                        <p className="lead">Are you curious about something? Do you have some kind of problem with our products?</p>
                        <p>Please feel free to contact us, our customer service center is working for you 24/7.</p>
                      </div>
                    </div>
                  </div>
                  <div id="contact" className="box">
                    <div className="row">
                      <div className="col-md-4">
                        <h3><i className="fa fa-map-marker"></i> Address</h3>
                        <p>2705 Thunder Road <br /> Palo Alto <br /> 94309<br /> CA<br /><strong>United States</strong></p>
                      </div>
                      <div className="col-md-4">
                        <h3><i className="fa fa-phone"></i> Call center</h3>
                        <p className="text-muted">
                          This number is toll free if calling from Great Britain otherwise we advise you to use the electronic form
                          of communication.
                        </p>
                        <p><strong>+1-650-123-4567</strong></p>
                      </div>
                      <div className="col-md-4">
                        <h3><i className="fa fa-envelope"></i> Electronic support</h3>
                        <p className="text-muted">Please feel free to write an email to us or to use our electronic ticketing system.</p>
                        <ul>
                          <li><strong><a href="mailto:">hello@beyondvirtual.io</a></strong></li>
                        </ul>
                      </div>
                    </div>
                    <h2 className="text-center">Contact form</h2>
                    <form>
                      <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="firstname">Firstname</label>
                                <input name="firstname" type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="lastname">Lastname</label>
                                <input name="lastname" type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input name="email" type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input name="subject" type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea name="message" className="form-control"></textarea>
                          </div>
                          <div className="text-center">
                            <button type="submit" className="btn btn-primary"><i className="fa fa-envelope-o"></i> Send message</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );    
    }
}

export default Contact;