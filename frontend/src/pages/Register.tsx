import { SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import userService from '../services/userService';
import { AuthResult, UserType } from '../utils/types';
import FormInput from '../components/FormInput';

interface RegisterProps {
  setLoggedInUser: (user: UserType) => void
  setMessage: (message: string) => void
}

const Register = ({ setLoggedInUser, setMessage }: RegisterProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (
    username: string,
    password: string,
    confirmation: string
  ) => {
    if (username === '' || password === '') {
      setMessage('Please enter a username and password');
      return;
    }

    if (username.length < 3) {
      setMessage('Username must be at least three characters');
      return;
    }

    if (password.length < 4) {
      setMessage('Password must be at least four characters');
      return;
    }

    if (password !== confirmation) {
      setMessage('Password and confirmation do not match');
    } else {
      const result: AuthResult | undefined = await userService.register(
        username,
        password
      );

      if (result) {
        console.log('handleRegister result:', result);
        const { success, message } = result;
        if (success) {
          console.log('handleRegister success:', success);
          const { user, token } = result;
          console.log('handleRegister user, token:', user, token);
          if (user && token) {
            console.log('handleRegister user && token');
            setLoggedInUser(user);
            localStorage.setItem('token', token);
            navigate('/');
          }
        }

        setMessage(message);
      }
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    handleRegister(username, password, confirmation);
  };

  return (
    <Container fluid>
      <h2>Sign Up</h2>
      <Form className='user-form' onSubmit={handleSubmit}>
        <FormInput
          label='Username'
          type='text'
          value={username}
          setValue={setUsername}
        />
        <FormInput
          label='Password'
          type='password'
          value={password}
          setValue={setPassword}
        />
        <FormInput
          label='Confirm'
          type='password'
          value={confirmation}
          setValue={setConfirmation}
        />
        <Button type='submit'>Sign Up</Button>
      </Form>
      <p className='text-center'>
        Already have an account? <Link to='/login'>Log In</Link>
      </p>
    </Container>
  );
};

export default Register;
