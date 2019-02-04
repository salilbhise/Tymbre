import React, { Component } from "react";
// import Image from 'react-bootstrap/Image';
import ChartistGraph from "react-chartist";
import { Container, Row, Col, Button, Modal, Image, } from "react-bootstrap";
import { Card } from "../../components/Card/Card.jsx";
import { StatsCard } from "../../components/StatsCard/StatsCard.jsx";
import { Tasks } from "../../components/Tasks/Tasks.jsx";
import {
  //dataPie,
  //legendPie,
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
//import { timingSafeEqual } from "crypto";
import helpers from "../../utils/helpers.js";
class Dashboard extends Component {
  state = {
    userIsLoggedIn: false,
    searchBarText: "",
    artist: "Michael Jackson",
    artistData: {
      name: "",
      genre: "",
      about: "",
      totalFollowersAndListeners: 0,
      imageLink: "",
      data: [{
        spotifyFollowers: 0,
        lastFMListeners: 0,
        hoursListened: 0,
        estimatedRevenue: 0
      }]
    },
    headerData: this.props.headerData,
    bioModalShow: false,
  }
  renderArtistDataOnPage = artist => {
    API.spotifySearch(artist).then(res => {
      console.log("Spotify Data: ", res.data);
      const tempState = this.state.artistData;
      tempState.data.spotifyFollowers = res.data.followers.total;
      tempState.imageLink = res.data.images[0].url;
      this.setState({
        artistData: tempState
      });
      return API.lastFMSearch(artist)
        .then(res => {
          console.log("Last.FM Data: ", res.data.artist);
          const tempState = this.state.artistData;
          tempState.data.lastFMListeners = res.data.artist.stats.listeners;
          tempState.about = res.data.artist.bio.content;
          tempState.totalFollowersAndListeners = parseInt(this.state.artistData.data.spotifyFollowers) + parseInt(this.state.artistData.data.lastFMListeners);
          tempState.data.estimatedRevenue = (parseInt(tempState.data.lastFMListeners) * 0.00275) + (parseInt(tempState.data.spotifyFollowers) * 0.0084);
          this.setState({
            artistData: tempState
          });
          return API.iTunesTrackInformationSearch(artist).then(res => {
            console.log("Track Data: ", res.data);
            const tempState = this.state.artistData;
            let trackArray = res.data;
            tempState.data.hoursListened = helpers.msToTime(tempState.totalFollowersAndListeners * trackArray.reduce((accumulator, currentValue) => accumulator + currentValue.trackTimeMillis, 0));
            this.setState({
              artistData: tempState
            })
          })
        });
    })
    API.iTunesSearch(artist).then(res => {
      console.log("iTunes Data: ", res.data);
      const tempState = this.state.artistData;
      tempState.name = res.data.results[0].artistName;
      tempState.genre = res.data.results[0].primaryGenreName;
      this.setState({
        artistData: tempState
      });
    });
  }
  componentWillMount() {
    API.getArtists().then(res => {
      console.log("Mongo Data: ", res.data);
    });
    this.renderArtistDataOnPage(this.state.artist);
  }
  componentDidMount() {
    API.iTunesTrackInformationSearch(this.state.artist).then(res => {
      console.log("Track Info iTunes: ", res.data);
    })
    console.log(this.state.artistData);
  }
  componentDidUpdate(prevProps) {
    if (this.props.headerData.name !== prevProps.headerData.name) {
      this.renderArtistDataOnPage(this.props.headerData.name);
    }
  }
  handleModalClose = () => {
    this.setState({ bioModalShow: false });
  }
  handleModalShow = () => {
    this.setState({ bioModalShow: true });
  }
  handleFollowButtonClick() {
    //if user is not logged in
  }
  handlePlayUpdateButtonClick = event => {
    event.preventDefault();
    API.getArtists().then(res => {
      let dbArray = res.data;
      console.log((helpers.artistSearch(res.data, this.state.artistData.name)));
      if (helpers.artistSearch(res.data, this.state.artistData.name) === false) {
        API.saveArtist({
          name: this.state.artistData.name,
          genre: this.state.artistData.genre,
          about: this.state.artistData.about,
          totalFollowersAndListeners: this.state.artistData.totalFollowersAndListeners,
          imageLink: this.state.artistData.imageLink,
          data: [
            {
              date: Date.now(),
              spotifyFollowers: this.state.artistData.data.spotifyFollowers,
              lastFMListeners: parseInt(this.state.artistData.data.lastFMListeners),
              estimatedRevenue: this.state.artistData.data.estimatedRevenue,
              hoursListened: this.state.artistData.data.hoursListened
            }
          ]
        })
      } else {
        let id = helpers.artistSearch(res.data, this.state.artistData.name);
        API.updateArtist((id), {
          date: Date.now(),
          spotifyFollowers: this.state.artistData.data.spotifyFollowers,
          lastFMListeners: parseInt(this.state.artistData.data.lastFMListeners),
          estimatedRevenue: this.state.artistData.data.estimatedRevenue,
          hoursListened: this.state.artistData.data.hoursListened
        })
      }
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
                statsText="Last FM Listeners"
                statsValue={(helpers.abbreviateNumber(this.state.artistData.data.lastFMListeners))}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-success" />}
                statsText="Spotify Followers"
                statsValue={helpers.abbreviateNumber(this.state.artistData.data.spotifyFollowers)}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-global text-primary" />}
                statsText={"Hours Listened"}
                statsValue={helpers.abbreviateNumber(this.state.artistData.data.hoursListened)}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-money text-success" />}
                statsText="Streaming Royalties"
                statsValue={"$" + helpers.abbreviateNumber(this.state.artistData.data.estimatedRevenue)}
                statsIcon={<i className="fa fa-asterisk" />}
                statsIconText="Monthly Estimate"
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
                title={this.state.artistData.name}
                category={this.state.artistData.genre}
                //stats="Campaign sent 2 days ago"
                content={
                  <Container>
                    <Row>
                      <Col></Col>
                      <Col xs={8}>
                        <Image fluid roundedCircle className="m-auto artistPicture" src={this.state.artistData.imageLink}></Image>
                      </Col>
                      <Col></Col>
                    </Row>
                    <Row>
                      <button type="button" className="my-4 mx-1 btn btn-primary" >Follow</button>
                      <Button className="my-4 mx-1" variant="outline-success" onClick={this.handlePlayUpdateButtonClick}>Update</Button>
                      <Button className="my-4 mx-1" variant="secondary" onClick={this.handleModalShow}>Bio</Button>
                    </Row>
                  </Container>
                }
              />
              {/* startModal */}
              <Modal size="lg" show={this.state.bioModalShow} onHide={this.handleModalClose}>
                <Modal.Header>
                  <Modal.Title>{this.state.artistData.name}'s Biography</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.state.artistData.about}</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={this.handleModalClose}>
                    Okay
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* endModal */}
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

