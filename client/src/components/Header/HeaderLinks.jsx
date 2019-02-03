import React, { Component } from "react";
import { Nav, Form, FormControl, Button } from "react-bootstrap";

class HeaderLinks extends Component {
  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        {/* <Nav>
          <Nav.Item eventKey={3} href="#">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </Nav.Item>
        </Nav> */}
        <Nav className="justify-content-end mr-auto" activeKey="/">
          <Nav.Item eventKey={1} href="#">
            <Nav.Link href="#">Account</Nav.Link>
          </Nav.Item>
          <Nav.Item eventKey={3} href="#">
            <Nav.Link href="#">Log Out</Nav.Link>
          </Nav.Item>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Nav>
      </div>
    );
  }
}

export default HeaderLinks;
