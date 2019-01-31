import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "../../components/Card/Card";
import { iconsArray } from "../../variables/Variables.jsx";

class Icons extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="About Us"
                ctAllIcons
                category={
                  <span>
                    Check out our GitHub{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://github.com/salilbhise/Tymbre"
                    >
                      Repo
                    </a>
                  </span>
                }
                content={
                  <Row>
                    {iconsArray.map((prop, key) => {
                      return (
                        <Col
                          lg={2}
                          md={3}
                          sm={4}
                          xs={6}
                          className="font-icon-list"
                          key={key}
                        >
                          <div className="font-icon-detail">
                            <i className={prop} />
                            <input type="text" defaultValue={prop} />
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Icons;
