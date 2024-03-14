import { SyntheticEvent, useEffect, useState } from 'react';
import { redirect, Route, Routes } from 'react-router-dom';

import { EventInfoType, ToDo, UserType } from './utils/types';
import userService from './services/userService';

import Agenda from './pages/Agenda';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar/NavBar';
import Notification from './components/Modals/Notification';
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

  /*
  useEffect(() => {
    if (!loggedInUser) return;

    const { username } = loggedInUser;

    const fetchUserEvents = async () => {
      const savedUserEvents = await userService.getUserEvents(username);
      console.log('fetchEvents events:', savedUserEvents);
      if (savedUserEvents.success) {
        setEvents(savedUserEvents.events);
      }
    };

    const fetchUserToDos = async () => {
      const savedUserToDos = await userService.getUserToDos(username);

      if (savedUserToDos.success) {
        setToDos(savedUserToDos.toDos);
      }
    };

    fetchUserEvents();
    fetchUserToDos();
  });
`*/
  return (
    <div id="main-container">
      <NavBar loggedInUser={loggedInUser} handleLogout={handleLogout} />
      <Notification message={message} setMessage={setMessage} />
      <div className="main-page">
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
              path="/agenda"
              element={
                <Agenda
                  loggedInUser={loggedInUser}
                  toDos={toDos}
                  events={events}
                />
              }
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
      </div>
    </div>
  );
}

export default App;
