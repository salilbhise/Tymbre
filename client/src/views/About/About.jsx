import React from 'react';
import { Row, Col, Container } from "react-bootstrap";
import { Card } from "../../components/Card/Card.jsx";
import { UserCard } from "../../components/UserCard/UserCard.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import avatar from "../../assets/img/faces/salface.png";
 const image = "https://fortunedotcom.files.wordpress.com/2018/07/gettyimages-961697338.jpg"

function About() {
  return (<div className="content">
    <Container>
      <Row>
        <Col md={6}>
          <UserCard
            bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
            avatar={image}
            name="Anthony Le"
            userName="aale12"
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
            bgImage="https://motionarray-portfolio.imgix.net/preview-83721-73b2ffab8d22cad99c5c66f9b51b4993-high.jpg?w=750&q=60&fit=max&auto=format"
            avatar={avatar}
            name="Salil Bhise"
            userName="newamsterdamn"
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