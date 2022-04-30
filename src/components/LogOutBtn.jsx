import React from 'react';
import { Button } from 'react-bootstrap';
import useAuth from '../hooks/index.jsx';

const LogOutBtn = () => {
  const auth = useAuth();
  const userId = JSON.parse(localStorage.getItem('userId'));

  return (
    // (userId && userId.token)
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : ''
  );
};

export default LogOutBtn;
