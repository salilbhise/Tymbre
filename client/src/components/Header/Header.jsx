import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from "react-bootstrap";

import HeaderLinks from "./HeaderLinks.jsx";

import dashboardRoutes from "../../routes/dashboard.jsx";
import API from "../../utils/API.js";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      searchArtist: "",
      sidebarExists: false
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
  getBrand() {
    var name;
    dashboardRoutes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  }
  //Search Function
  handleSearchButtonClick = event => {
    event.preventDefault();
    if (this.state.searchBarText !== "") {
      API.spotifySearch(this.state.searchArtist).then(res => {
        console.log("SearchBarLog", res.data);
        this.props.recieveDataFromHeader(res.data);
      })
    }
  }
  //Updates Text on Search Bar
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.searchArtist);
  }
  render() {
    return (
      <Navbar className="text-white">
        <Navbar.Brand>
          <a href="#pablo">{this.getBrand()}</a>
        </Navbar.Brand>
        <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        <Navbar.Collapse>
          <Nav className="mr-auto justify-content-end text-white">
            <Nav.Link href="#" className="text-white">Account</Nav.Link>
            <Nav.Link href="#" className="text-white">Log Out</Nav.Link>
          </Nav>
          <Form onChange={this.handleInputChange} inline className="my-auto">
            <FormControl name="searchArtist" type="text" placeholder="Search for an Artist..." className="mr-sm-2 text-dark" />
            <Button onClick={this.handleSearchButtonClick} className="btn-success" variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
