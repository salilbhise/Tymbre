import React, { Component } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";

import Card from "../../components/Card/Card";

import Button from "../../components/CustomButton/CustomButton";

class Icons extends Component {
  render() {
    return (
      <div className="content">
        <Container fluid>
          <Row>
            <Col md={8} mdOffset={2}>
              <Card
                hCenter
                title="Questions x Comments x Collabs"
                category="We'd love to hear from you."
                ctTableResponsive
                ctTableFullWidth
                ctTableUpgrade
                content={
                  <Table>
                    <thead>
                      <tr>
                        <th />
                        <th className="text-center">Anthony</th>
                        <th className="text-center">Sal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Personal Emails</td>
                        <td><a href="mailto:leanthony104@yahoo.com" rel="noopener noreferrer" target="_blank">leanthony104@yahoo.com</a></td>
                        <td><a href="mailto:hello@salilbhise.com" rel="noopener noreferrer" target="_blank">hello@salilbhise.com</a></td>
                      </tr>
                      <tr>
                        <td />
                        <td>
                        </td>
                        <td>
                          <Button
                            target="_blank"
                            href="mailto:tymbreapp@gmail.com"
                            round
                            fill
                            bsStyle="info"
                          >
                            Email Tymbre
                          </Button>
                        </td>
                      </tr>
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

export default Icons;
