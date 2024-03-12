import axios from 'axios';

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

export default {
  getUserByToken,
  login,
  register,
};
