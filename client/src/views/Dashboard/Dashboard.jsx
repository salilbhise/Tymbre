import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "../../components/Card/Card.jsx";
import { StatsCard } from "../../components/StatsCard/StatsCard.jsx";
import { Tasks } from "../../components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "../../variables/Variables.jsx";
import API from "../../utils/API.js";
import { timingSafeEqual } from "crypto";

const tempArtistData = {};

class Dashboard extends Component {
  state = {
    userIsLoggedIn: false,
    searchBarText: "",
    artist: "Michael Jackson",
    artistData: {
      name: "",
      genre: "",
      about: "",
      spotifyFollowers: 0,
      lastFMListeners: 0,
      totalFollowersAndListeners: 0,
      imageLink: ""
    }
  }
  componentWillMount() {
    // API.getArtists().then(data => {
    //   console.log("Mongo Data: ", data);
    // });
    API.spotifySearch(this.state.artist).then(res => {
      console.log("Spotify Data: ", res.data);
      const tempState = this.state.artistData;
      tempState.spotifyFollowers = res.data.followers.total;
      this.setState({
        artistData: tempState
      });
      tempState.imageLink = res.data.images[0].url;
      this.setState({
        artistData: tempState
      })
      return API.lastFMSearch(this.state.artist)
        .then(res => {
          console.log("Last.FM Data: ", res.data.artist);
          const tempState = this.state.artistData;
          tempState.lastFMListeners = res.data.artist.stats.listeners;
          this.setState({
            artistData: tempState
          });
          tempState.about = res.data.artist.bio.summary;
          this.setState({
            artistData: tempState
          });
          const tempState2 = this.state.artistData;
          tempState2.totalFollowersAndListeners = parseInt(this.state.artistData.spotifyFollowers) + parseInt(this.state.artistData.lastFMListeners);
          this.setState({
            artistData: tempState2
          })
        });
    })
    API.iTunesSearch(this.state.artist).then(res => {
      console.log("iTunes Data: ", res.data.results[0]);
      const tempState = this.state.artistData;
      tempState.name = res.data.results[0].artistName;
      this.setState({
        artistData: tempState
      });
      tempState.genre = res.data.results[0].primaryGenreName;
      this.setState({
        artistData: tempState
      });
    });
  }
  componentDidMount() {
    //console.log(this.state.artistData);
  }
  handleFollowButtonClick() {
    //if user is not logged in
  }
  handlePlayUpdateButtonClick() {
    API.saveArtist({
      artistData: this.state.artistData
    })
  }
  createLegend(json) {
    const legend = [];
    for (let i = 0; i < json["names"].length; i++) {
      const type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <Container fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-music text-danger" />}
                statsText="Listeners"
                statsValue={this.state.artistData.lastFMListeners}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-success" />}
                statsText="Followers"
                statsValue={this.state.artistData.spotifyFollowers}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-global text-primary" />}
                statsText="Countries"
                statsValue="65"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Followers"
                statsValue={this.state.artistData.totalFollowersAndListeners}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Artist Performance"
                category="Last 52 Weeks"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title={this.state.artistData.name}
                category={this.state.artistData.genre}
                //stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <img src={this.state.artistData.imageLink}></img>
                    <p>{this.state.artistData.about}</p>
                    {/* <ChartistGraph data={dataPie} type="Pie" /> */}
                  </div>
                }
              // legend={
              //   <div className="legend">{this.createLegend(legendPie)}</div>
              // }
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Dashboard;

