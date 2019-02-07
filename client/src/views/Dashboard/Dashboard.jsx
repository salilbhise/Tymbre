import * as d3 from "d3";
import React, { Component } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, ResponsiveContainer } from "recharts";
import { Container, Row, Col, Button, Modal, Image, } from "react-bootstrap";
import { Card } from "../../components/Card/Card.jsx";
import { StatsCard } from "../../components/StatsCard/StatsCard.jsx";
import tier1Image from "../../assets/img/one.png";
import tier2Image from "../../assets/img/two.png";
import tier3Image from "../../assets/img/three.png";
import {
  tymbreRating,
} from "../../variables/Variables.jsx";
import API from "../../utils/API.js";
import helpers from "../../utils/helpers.js";
class Dashboard extends Component {
  state = {
    tierImages: [
      tier1Image,
      tier2Image,
      tier3Image
    ],
    userIsLoggedIn: false,
    searchBarText: "",
    artist: "Michael Jackson",
    artistData: {
      name: "Michael Jackson",
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
    bioModalShow: false
  }
  renderArtistDataOnPage = artist => {
    console.log(artist);
    API.spotifySearch(artist).then(res => {
      console.log("Spotify Data: ", res.data);
      const tempState = this.state.artistData;
      tempState.name = res.data.name;
      tempState.data.spotifyFollowers = res.data.followers.total;
      tempState.imageLink = res.data.images[0].url;
      this.setState({
        artistData: tempState,
        spotifyLink: res.data.external_urls.spotify
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
            artistData: tempState,
            lastFMLink: res.data.artist.bio.links.link.href
          });
          return API.iTunesTrackInformationSearch(artist).then(res => {
            console.log("Track Data: ", res.data);
            const tempState = this.state.artistData;
            let trackArray = res.data;
            tempState.data.hoursListened = helpers.msToTime(tempState.totalFollowersAndListeners * trackArray.reduce((accumulator, currentValue) => accumulator + currentValue.trackTimeMillis, 0));
            this.setState({
              artistData: tempState
            });
            return API.getArtists().then(res => {
              console.log("77: ", res.data);
              console.log("78: ", this.state.artistData);
              if (helpers.artistSearch(res.data, this.state.artistData.name) === false) {
                this.setState({
                  artistInDB: false
                })
              } else {
                this.setState({
                  artistInDB: true
                })
                const id = helpers.artistSearch(res.data, this.state.artistData.name);
                API.getArtist(id).then(res => {
                  const dataArray = res.data.data;
                  console.log(dataArray.length);
                  if (dataArray.length === 1) {
                    this.setState({
                      artistInDB: false
                    });
                  } else {
                    this.setState({
                      artistInDB: true
                    });
                  }
                  let tempRechartsData = [];
                  let tempRechartsBarData = [];
                  tempRechartsBarData.push(
                    {
                      name: "Follower/Listener Source",
                      "Last.FM": this.state.artistData.data.lastFMListeners,
                      "Spotify": this.state.artistData.data.spotifyFollowers
                    },
                    {
                      name: "Hours Listened Source",
                      "Last.FM": helpers.msToTime(this.state.artistData.data.lastFMListeners * trackArray.reduce((accumulator, currentValue) => accumulator + currentValue.trackTimeMillis, 0)),
                      "Spotify": helpers.msToTime(this.state.artistData.data.spotifyFollowers * trackArray.reduce((accumulator, currentValue) => accumulator + currentValue.trackTimeMillis, 0))
                    },
                    {
                      name: "Streaming Royalties",
                      "Last.FM": this.state.artistData.data.lastFMListeners * 0.00275,
                      "Spotify": this.state.artistData.data.spotifyFollowers * 0.0084
                    }
                  )
                  let timeArray = [];
                  dataArray.forEach(e => {
                    timeArray.push(e.date);
                    tempRechartsData.push({
                      time: e.date,
                      "Followers/Listeners": e.spotifyFollowers + e.lastFMListeners
                    });
                  });

                  this.setState({
                    tymbreRating: helpers.determineTymbreRating(
                      dataArray[0].spotifyFollowers + dataArray[0].lastFMListeners,
                      dataArray[dataArray.length - 1].spotifyFollowers + dataArray[dataArray.length - 1].lastFMListeners,
                      helpers.msToTime(dataArray[dataArray.length - 1].date - dataArray[0].date)),
                    rechartsGraphData: tempRechartsData,
                    lastUpdated: (helpers.timeSince(Math.max(...timeArray))),
                    createdAt: (helpers.timeSince(Math.min(...timeArray))),
                    spotifyFollowersChangeSinceLastUpdate: this.state.artistData.data.spotifyFollowers - dataArray[dataArray.length - 1].spotifyFollowers,
                    lastFMListenersChangeSinceLastUpdate: this.state.artistData.data.lastFMListeners - dataArray[dataArray.length - 1].lastFMListeners,
                    rechartsBarGraphData: tempRechartsBarData
                  });
                })
              }
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
      console.log(this.state.artistData.name);
      console.log((helpers.artistSearch(res.data, this.state.artistData.name)));
    });
    console.log("willMount: ", this.state.artist);
    this.renderArtistDataOnPage(this.state.artist);
  }
  componentDidUpdate(prevProps) {
    if (this.props.headerData.name !== prevProps.headerData.name) {
      console.log("didUpdate: ", this.props.headerData.name);
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
      console.log("resDataButton ", res.data);
      console.log("hello", this.state.artistData.name.toString());
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
        }).then(res => {
          console.log("219: ", this.props.headerData.name);
          this.renderArtistDataOnPage(this.props.headerData.name);
        })
      } else {
        let id = helpers.artistSearch(res.data, this.state.artistData.name);
        API.updateArtist((id), {
          date: Date.now(),
          spotifyFollowers: this.state.artistData.data.spotifyFollowers,
          lastFMListeners: parseInt(this.state.artistData.data.lastFMListeners),
          estimatedRevenue: this.state.artistData.data.estimatedRevenue,
          hoursListened: this.state.artistData.data.hoursListened
        }).then(res => {
          console.log("229", this.state.artistData);
          console.log("230: ", this.props.headerData.name);
          this.renderArtistDataOnPage(this.state.artistData.name);
        })
      }
    });
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
              <div onClick={() => {
                window.open(this.state.lastFMLink);
              }}
              >
                <StatsCard
                  bigIcon={<i className="pe-7s-music text-danger" />}
                  statsText="Last FM Listeners"
                  statsValue={(helpers.abbreviateNumber(this.state.artistData.data.lastFMListeners))}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText={
                    this.state.artistInDB === false ? (
                      ""
                    ) : (
                        this.state.lastUpdated + " ago " + helpers.gainOrLoss(this.state.lastFMListenersChangeSinceLastUpdate))}
                />
              </div>
            </Col>
            <Col lg={3} sm={6}>
              <div onClick={() => {
                window.open(this.state.spotifyLink);
              }}
              >
                <StatsCard
                  bigIcon={<i className="pe-7s-users text-success" />}
                  statsText="Spotify Followers"
                  statsValue={helpers.abbreviateNumber(this.state.artistData.data.spotifyFollowers)}
                  statsIcon={<i className="fa fa-calendar-o" />}
                  statsIconText={
                    this.state.artistInDB === false ? (
                      ""
                    ) : (
                        this.state.lastUpdated + " ago " + helpers.gainOrLoss(this.state.spotifyFollowersChangeSinceLastUpdate))}
                />
              </div>
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-global text-primary" />}
                statsText={"Hours Listened"}
                statsValue={helpers.abbreviateNumber(this.state.artistData.data.hoursListened)}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={
                  this.state.artistInDB === false ? (
                    ""
                  ) : (
                      this.state.lastUpdated + " ago")}
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-money text-success" />}
                statsText="Streaming Royalties"
                statsValue={"$" + helpers.abbreviateNumber(this.state.artistData.data.estimatedRevenue)}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={
                  this.state.artistInDB === false ? (
                    ""
                  ) : (
                      this.state.lastUpdated + " ago")}
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Artist Total Followers and Listeners"
                category={"Last " + this.state.createdAt}
                stats={
                  this.state.artistInDB === false ? (
                    ""
                  ) : ("Updated " + this.state.lastUpdated + " ago")}
                content={
                  this.state.artistInDB === false ? (
                    <h2 className="text-center">Insufficient Data: Try updating the Artist a few times with the Update Button!</h2>
                  ) : (
                      <div className="ct-chart">
                        <ResponsiveContainer>
                          <AreaChart data={this.state.rechartsGraphData}
                            margin={{ top: 0, right: 30, left: 30, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" tickFormatter={d3.timeFormat('%m/%d %H:%M')} />
                            <YAxis dataKey="Followers/Listeners" domain={["dataMin", "dataMax"]} tickFormatter={d3.format(".4s")} />
                            <Tooltip />
                            <Area type='monotone' dataKey='Followers/Listeners' stroke='#8884d8' fill='#8884d8' />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    )
                }
              />
            </Col>
            <Col md={4}>
              <Card
                title={this.state.artistData.name}
                category={this.state.artistData.genre}
                content={
                  <Container>
                    <Row>
                      <Col></Col>
                      <Col xs={7}>
                        <Image fluid roundedCircle className="m-auto artistPicture" src={this.state.artistData.imageLink}></Image>
                      </Col>
                      <Col></Col>
                    </Row>
                    <Row>
                      <button type="button" className="my-4 mx-1 btn btn-primary" >Follow</button>
                      <button type="button" className="my-4 mx-1 btn btn-secondary" onClick={this.handlePlayUpdateButtonClick}>Update</button>
                      <button type="button" className="my-4 mx-1 btn bnt-danger" onClick={this.handleModalShow}>Bio</button>
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
            <Col md={8}>
              <Card
                id="chartActivity"
                title="Last.FM and Spotify Comparison"
                category="Current Data"
                stats={
                  this.state.artistInDB === false ? (
                    <h2></h2>
                  ) : (
                      `Data information certified * ${this.state.lastUpdated} ago`
                    )
                }
                statsIcon="fa fa-check"
                content={
                  this.state.artistInDB === false ? (
                    <h2></h2>
                  ) : (
                      <div className="ct-chart">
                        <ResponsiveContainer>
                          <BarChart data={this.state.rechartsBarGraphData}
                            margin={{ top: 0, right: 30, left: 90, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={["dataMin", "dataMax"]} tickFormatter={d3.format(".4s")} />
                            <Tooltip formatter={d3.format(",")} />
                            <Legend />
                            <Bar dataKey="Last.FM" fill="#d51007" />
                            <Bar dataKey="Spotify" fill="#1DB954" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )
                }
              />
            </Col>
            <Col md={4}>
              <Card
                title="Tymbre Rating"
                category="In House Rating"
                content={
                  this.state.artistInDB === false ? (
                    <h2></h2>
                  ) : (
                      <div className="m-0">
                        <h1 className="my-3 tierText text-center">
                          Tier <br />
                          <Image roundedCircle className="tierImage" src={this.state.tierImages[this.state.tymbreRating - 1]}>
                          </Image>
                        </h1>
                        <p>
                          {tymbreRating.ratingDescription[this.state.tymbreRating - 1]}
                        </p>
                      </div>
                    )
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

