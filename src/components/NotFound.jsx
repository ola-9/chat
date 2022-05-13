import React from 'react';
import { Container } from 'react-bootstrap';
import notFoundImage from '../../assets/404.jpg';

const NotFound = () => (
  <Container className="text-center">
    <img
      alt="страница не найдена"
      className="img-fluid"
      src={notFoundImage}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти на &nbsp;
      <a href="/">на главную страницу</a>
    </p>
  </Container>
);

export default NotFound;
