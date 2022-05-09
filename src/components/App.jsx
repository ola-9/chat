import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  NavLink,
} from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'react-toastify/dist/ReactToastify.min.css';
import * as yup from 'yup';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import AuthContext from '../contexts/index.jsx';
import Chat from './Chat.jsx';
import LogOutBtn from './LogOutBtn.jsx';
import useAuth from '../hooks/index.jsx';

const socket = io();

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const initialState = (userId && userId.token);
  const [loggedIn, setLoggedIn] = useState(initialState);
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
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  const { t } = useTranslation();

  yup.setLocale({
    string: {
      min: () => ({ key: 'errors.minMax' }),
      max: () => ({ key: 'errors.minMax' }),
    },
    mixed: {
      notOneOf: () => ({ key: 'errors.notUnique' }),
      required: () => ({ key: 'errors.required' }),
    },
  });

  return (
    <AuthProvider>
      <Router>
        <Navbar variant="light" bg="white" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand>
              <NavLink className="navbar-brand" to="/">{t('header.brand')}</NavLink>
            </Navbar.Brand>
            <LogOutBtn />
          </Container>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Chat socket={socket} />
              </PrivateRoute>
            )}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthProvider>
  );
};

export default App;
