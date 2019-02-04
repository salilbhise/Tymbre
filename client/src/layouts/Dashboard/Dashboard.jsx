import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import { Container, Button } from "react-bootstrap";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";

import { style } from "../../variables/Variables.jsx";

import dashboardRoutes from "../../routes/dashboard.jsx";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.state = {
      _notificationSystem: null,
      artists: [],
      data1: "",
      landingPage: true,
      redirect: false
    };
  }
  handleNotificationClick(position) {
    const color = Math.floor(Math.random() * 4 + 1);
    let level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-graph1" />,
      message: (
        <div>
          Welcome to <b>Tymbre</b>! A Big-Data Music Analytics App.
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  }
  componentDidMount() {
    console.log("Landing Page Trigger: ", this.state.landingPage);
    const self = this;
    // setTimeout(function () {
    //   self.setState({
    //     landingPage: false,
    //     redirect: true
    //   })
    // }, 30000)
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    // _notificationSystem.addNotification({
    //   title: <span data-notify="icon" className="pe-7s-graph1" />,
    //   message: (
    //     <div>
    //       Welcome to <b>Tymbre</b>! A Big-Data Music Analytics App.
    //   </div>
    //   ),
    //   level: level,
    //   position: "tr",
    //   autoDismiss: 15
    // });
  }
  handleToDashBoard = event => {
    event.preventDefault();
    this.setState({
      landingPage: false
    });
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  recieveDataFromHeader = headerData => {
    this.setState({ data1: headerData }, () => {
      console.log("data1 from Header", headerData);
    })
  }
  renderRedirect = () => {
    if (this.state.redirect == true) {
      return <Redirect to="/dashboard" />
    }
  }

  render() {
    return (this.state.landingPage === true) ?
      (
        <Container className="landingContainer text-white">
          <h1 className="titleContainer text-center">
            Tymbre
        </h1>
          <h2 className="text-center">
            from timbre - tym·​bre | \ ˈtam-bər  , ˈtim-; ˈtam(brᵊ)\:
        </h2>
          <h3 className="text-center">
            the quality given to a sound by its overtones: such as<br />
            a : the resonance by which the ear recognizes and identifies a voiced speech sound<br />
            b : the quality of tone distinctive of a particular singing voice or musical instrument
        </h3>
          <Button variant="primary" onClick={this.handleToDashBoard}>click me</Button>
          {
            this.renderRedirect()
          }
          <Switch
          >
          </Switch>
        </Container>
      ) : (
        <div className="wrapper">
          <NotificationSystem ref="notificationSystem" style={style} />
          <Sidebar {...this.props} />
          <div id="main-panel" className="main-panel" ref="mainPanel">
            <Header {...this.props} data={this.state.headerData} recieveDataFromHeader={this.recieveDataFromHeader} />
            <Switch
            >
              {dashboardRoutes.map((prop, key) => {
                if (prop.redirect)
                  return <Redirect
                    from={prop.path} to={prop.to} render={routeProps => (
                      <prop.component
                        {...routeProps}
                        headerData={this.state.data1}
                      />
                    )} key={key} />;
                return (
                  <Route
                    path={prop.path} render={routeProps => (
                      <prop.component
                        {...routeProps}
                        headerData={this.state.data1}
                      />
                    )} key={key} />
                );
              })}
            </Switch>
            <Footer />
          </div>
        </div>
      )
  }
}

export default Dashboard;
