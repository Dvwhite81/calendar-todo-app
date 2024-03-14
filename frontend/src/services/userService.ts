import axios from 'axios';
import { EventInfoType, ToDo } from '../utils/types';

const baseUrl = 'http://localhost:7000';

const login = async (username: string, password: string) => {
  console.log('auth login');
  const user = { username, password };
  console.log('user:', user);
  const { data } = await axios.post('http://localhost:7000/login', user);
  console.log('data:', data);
  if (data.success) {
    return {
      success: true,
      message: data.message,
      user: data.user,
      token: data.token,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const register = async (username: string, password: string) => {
  console.log('auth register');
  const user = { username, password };

  const { data } = await axios.post(`${baseUrl}/register`, user);

  if (data.success) {
    return login(username, password);
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const getUserByToken = async (token: string) => {
  const { data } = await axios.get(`${baseUrl}/users/${token}`);

  if (data.success) {
    return {
      success: true,
      message: data.message,
      user: data.user,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const getUserEvents = async (username: string) => {
  const { data } = await axios.get(`${baseUrl}/users/${username}/events`);
  if (data.success) {
    console.log('frontend data:', data);

    return {
      success: true,
      events: data.events,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const getUserToDos = async (username: string) => {
  const { data } = await axios.get(`${baseUrl}/users/${username}/toDos`);
  if (data.success) {
    return {
      success: true,
      toDos: data.toDos,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const addUserEvent = async (username: string, event: EventInfoType) => {
  console.log('addEvent event:', event);
  const { data } = await axios.post(
    `${baseUrl}/users/${username}/events`,
    event
  );

  console.log('addEvent data:', data);
  if (data.success) {
    return {
      success: true,
      message: data.message,
      newEvent: event,
      events: data.events,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const addUserToDo = async (username: string, toDo: ToDo) => {
  const { data } = await axios.post(`${baseUrl}/users/${username}/toDos`, toDo);

  if (data.success) {
    return {
      success: true,
      message: data.message,
      newToDo: toDo,
      toDos: data.toDos,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const deleteUserEvent = async (username: string, event: EventInfoType) => {
  const { data } = await axios.put(
    `${baseUrl}/users/${username}/events`,
    event
  );

  if (data.success) {
    return {
      success: true,
      message: data.message,
      events: data.events,
    };
  }
};

const deleteUserToDo = async (username: string, toDo: ToDo) => {
  const { data } = await axios.put(`${baseUrl}/users/${username}/toDos`, toDo);

  if (data.success) {
    return {
      success: true,
      message: data.message,
      toDos: data.toDos,
    };
  }
};

export default {
  addUserEvent,
  addUserToDo,
  deleteUserEvent,
  deleteUserToDo,
  getUserByToken,
  getUserEvents,
  getUserToDos,
  login,
  register,
};
