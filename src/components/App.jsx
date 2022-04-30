import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { io } from 'socket.io-client';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import AuthContext from '../contexts/index.jsx';
import Chat from './Chat.jsx';
import LogOutBtn from './LogOutBtn.jsx';
// import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  // const auth = useAuth();
  const location = useLocation();
  const userId = JSON.parse(localStorage.getItem('userId'));
  // localStorage.removeItem('userId');
  return (
    (userId && userId.token) ? children : <Navigate to="/login" state={{ from: location }} />
    // auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

function App() {
  const socket = io();
  socket.on('newMessage', (msg) => {
    console.log(msg);
  });

  return (
    <AuthProvider>
      <Router>
        <Navbar variant="light" bg="white" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
            {/* <NavLink className="navbar-brand" to="/">Hexlet Chat</NavLink> */}
            <LogOutBtn />
          </Container>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            )}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
