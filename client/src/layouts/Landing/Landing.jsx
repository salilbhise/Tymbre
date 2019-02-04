import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route, Switch, Redirect } from "react-router-dom";


export default class Landing extends Component {
  render() {
    return (
      <Container className="landingContainer text-white">
        This is the tymbre landing page
        <a href="/dashboard">click me</a>
        <Switch
        >
        </Switch>
      </Container>
    )
  }
}