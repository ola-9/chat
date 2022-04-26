import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import MyTest from './MyText.jsx';

function App() {
  return (
    <Router>
      <Navbar variant="light" bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid className="h-100">
        <Routes>
          <Route path="/" element={null} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<MyTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
