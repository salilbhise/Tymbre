import React from 'react';
import { Row, Col, Container } from "react-bootstrap";
import { Card } from "../../components/Card/Card.jsx";
import { UserCard } from "../../components/UserCard/UserCard.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import avatar from "../../assets/img/faces/salface.png";
 const image = "https://gl-images.condecdn.net/image/DLl1XeQ691J/crop/200/square/f/mark-zuckerberg_glamour_26jan16_pa_b.jpg"

function About() {
  return (<div className="content">
    <Container>
      <Row>
        <Col md={6}>
          <UserCard
            bgImage="https://image.freepik.com/free-photo/white-brick-wall-background_1203-2759.jpg"
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
            bgImage="https://image.freepik.com/free-photo/white-brick-wall-background_1203-2759.jpg"
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