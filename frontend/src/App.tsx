import { SyntheticEvent, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { redirect, Route, Routes } from 'react-router-dom';
import { EventInfoType, ToDo, UserType } from './utils/types';
import userService from './services/userService';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar/NavBar';
import Notification from './components/Modals/Notification';
import Profile from './pages/Agenda';
import Register from './pages/Register';
import './App.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  const [query, setQuery] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [events, setEvents] = useState<EventInfoType[]>([]);
  const [toDos, setToDos] = useState<ToDo[]>([]);

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('token');
    setMessage('Logged Out!');
  };

  const handleSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setQuery('');
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const data = await userService.getUserByToken(token);

        if (data.success) {
          const { user } = data;
          setLoggedInUser(user);
        }
      } else {
        setLoggedInUser(null);
      }
    };

    checkLoggedIn();
    redirect('/');
  });

  return (
    <Container fluid id="main-container">
      <NavBar loggedInUser={loggedInUser} handleLogout={handleLogout} />
      <Notification message={message} setMessage={setMessage} />
      <Container
        fluid
        className="d-flex flex-column"
        style={{ height: 'var(--main-height)' }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                query={query}
                setQuery={setQuery}
                handleSubmit={handleSearchSubmit}
                loggedInUser={loggedInUser}
                events={events}
                setEvents={setEvents}
                toDos={toDos}
                setToDos={setToDos}
              />
            }
          />
          {loggedInUser ? (
            <Route
              path="/profile"
              element={<Profile loggedInUser={loggedInUser} />}
            />
          ) : (
            <>
              <Route
                path="/register"
                element={
                  <Register
                    setLoggedInUser={setLoggedInUser}
                    setMessage={setMessage}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <Login
                    setLoggedInUser={setLoggedInUser}
                    setMessage={setMessage}
                  />
                }
              />
            </>
          )}
        </Routes>
      </Container>
    </Container>
  );
}

export default App;
