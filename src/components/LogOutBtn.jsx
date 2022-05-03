import React from 'react';
import { Button } from 'react-bootstrap';
import useAuth from '../hooks/index.jsx';

const LogOutBtn = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : ''
  );
};

export default LogOutBtn;
