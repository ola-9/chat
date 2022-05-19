import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  NavLink,
} from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import AuthProvider from '../contexts/AuthProvider.jsx';
import Chat from './Chat.jsx';
import LogOutBtn from './LogOutBtn.jsx';
import useAuth from '../hooks/useAuth.jsx';
import Signup from './Signup.jsx';
import SocketProvider from '../contexts/SocketProvider.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = ({ socket }) => {
  const { t } = useTranslation();

  return (
    <AuthProvider>
      <SocketProvider socket={socket}>
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
                  <Chat />
                </PrivateRoute>
              )}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </SocketProvider>
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
