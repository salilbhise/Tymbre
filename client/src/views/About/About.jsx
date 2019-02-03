import React from 'react';
import { Row, Col, Container } from "react-bootstrap";
import { Card } from "../../components/Card/Card.jsx";
import { UserCard } from "../../components/UserCard/UserCard.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";

import avatar from "../../assets/img/faces/face-3.jpg";


function About() {
  return (<div className="content">
    <Container fluid>
    <Row>
      <Col md={6}>
        <UserCard
          bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
          avatar={avatar}
          name="Anthony Le"
          userName="michael24"
          description={
            <span>
              "Lamborghini Mercy
                    <br />
              Your chick she so thirsty
                    <br />
              I'm in that two seat Lambo"
                  </span>
          }
          socials={
            <div>
              <Button simple>
                <i className="fa fa-facebook-square" />
              </Button>
              <Button simple>
                <i className="fa fa-twitter" />
              </Button>
              <Button simple>
                <i className="fa fa-google-plus-square" />
              </Button>
            </div>
          }
        />
      </Col>
      <Col md={6}>
        <UserCard
          bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
          avatar={avatar}
          name="Salil Bhise"
          userName="michael24"
          description={
            <span>
              "Lamborghini Mercy
                    <br />
              Your chick she so thirsty
                    <br />
              I'm in that two seat Lambo"
                  </span>
          }
          socials={
            <div>
              <Button simple>
                <i className="fa fa-facebook-square" />
              </Button>
              <Button simple>
                <i className="fa fa-twitter" />
              </Button>
              <Button simple>
                <i className="fa fa-google-plus-square" />
              </Button>

            </div>
          }
        />
      </Col>
      </Row>
      </Container>
  </div>)
  }
  
  
  
  
  
export default About;