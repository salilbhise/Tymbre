import React from 'react';
import { Row, Col, Container } from "react-bootstrap";
import { UserCard } from "../../components/UserCard/UserCard.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import avatar from "../../assets/img/faces/salface.png";
const image = "http://i66.tinypic.com/2q8u15y.jpg"

function About() {
  return (<div className="content">
    <Container>
      <Row>
        <Col md={6}>
          <UserCard
            href="https://github.com/aale12"
            bgImage="https://image.freepik.com/free-photo/white-brick-wall-background_1203-2759.jpg"
            avatar={image}
            name="Anthony Le"
            userName="aale12"
            description={
              <span>
                "She's in love with who I am
                    <br />
                Back in high school, I used to bus it to the dance
                    <br />
                Now I hit the FBO with duffels in my hands"
                    <br />
                - Drake
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
            href="https://github.com/salilbhise"
            bgImage="https://image.freepik.com/free-photo/white-brick-wall-background_1203-2759.jpg"
            avatar={avatar}
            name="Salil Bhise"
            userName="newamsterdamn"
            description={
              <span>
                "Yeek yeek woop woop! why you all in my ear?!
                    <br />
                Talking a whole bunch of shit
                    <br />
                That I ain't trying to hear!"
                <br />
                - Ludacris
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