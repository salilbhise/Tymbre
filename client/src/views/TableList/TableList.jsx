import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

import Card from "../../components/Card/Card.jsx";
import { tdArray } from "../../variables/Variables.jsx";
import API from "../../utils/API.js";

class TableList extends Component {
  state = {
    headerArray: [
      "ID",
      "Name",
      "Genre",
      "Spotify Followers",
      "LastFM Listeners",
      "Hours Listened",
      "Streaming Royalties"
    ],
    artistsArray: []
  }
  generateArtistDataArray = () => {
    API.getArtists().then(res => {
      let tempArtistsArray = [];
      for (let i = 0; i < res.data.length; i++) {
        tempArtistsArray.push([]);
        tempArtistsArray[i].push(
          i + 1,
          res.data[i].name,
          res.data[i].genre,
          res.data[i].data[res.data[i].data.length - 1].spotifyFollowers,
          res.data[i].data[res.data[i].data.length - 1].lastFMListeners,
          res.data[i].data[res.data[i].data.length - 1].hoursListened.toFixed(0),
          "$" + res.data[i].data[res.data[i].data.length - 1].estimatedRevenue.toFixed(2));
      }
      this.setState({
        artistsArray: tempArtistsArray
      })
      console.log(res.data);
      console.log(tempArtistsArray);
      console.log("state: ", this.state.artistsArray);
    })
  }
  componentWillMount() {
    this.generateArtistDataArray();
  }
  render() {
    return (
      <div className="content">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Artists You're Following"
                category="Sorted By ID"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {this.state.headerArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.artistsArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TableList;
