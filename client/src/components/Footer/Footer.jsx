import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <nav className="pull-left">
            <ul>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://github.com/aale12">Anthony Le</a> & <a href="https://github.com/salilbhise">Salil Bhise</a>
          </p>
        </Container>
      </footer>
    );
  }
}

export default Footer;
