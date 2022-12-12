import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '/dark-logo.png';
const Footer = () => {
  return (
    <>
      <Container className="footer text-white text-center" fluid>
        <Row>
          <Col md={{ span: 4, offset: 2 }}>
            <img width="220px" height="120px" src={logo} className="mb-5 mt-3" />
            <p className="text-uppercase lead" style={{ fontSize: '12px' }}>
              © www.hotel-touristic.am | All rights reserved
            </p>
          </Col>
          <Col
            md={4}
            className="footer__contacts d-flex flex-column justify-content-center align-items-center"
          >
            <p className="fs-5 text-uppercase lead">Contacts</p>
            <ul className="d-flex flex-column justify-content-start align-items-start">
              <li>Email: hotel-touristic@gmail.com</li>
              <li>Telephone: +374-60-00-00-00</li>
              <li>Instagram: @hoteltouristic</li>
              <li>Twitter: @hoteltouristic</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
