import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Navigation = () => (
  <Navbar variant="light" bg="white" expand="lg" className="shadow-sm">
    <Container>
      <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
    </Container>
  </Navbar>
);

export default Navigation;
