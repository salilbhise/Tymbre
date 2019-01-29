import React, { Component } from "react";
import { Grid } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
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
        </Grid>
      </footer>
    );
  }
}

export default Footer;
