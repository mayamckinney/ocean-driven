import React, { useState } from 'react';
import {
  Container,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Text,
  Button, 
  Link
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate()
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });

    if (data) {
      navigate('/')
    }
  };

  return (
    <main>
      <Container maxW='750px' my='50px' centerContent>
        <Container maxW='675px' my='25px' centerContent>
          <form onSubmit={handleFormSubmit}>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type='email' value={formState.email} onChange={handleChange} />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type='password' value={formState.email} onChange={handleChange} />
            </FormControl>
            <Button type='submit'>Login</Button>
          </form>
        </Container>
        <Text>No account yet? <Link color='blue' href='/signup'>Sign up</Link> instead!</Text>
      </Container>
    </main>
  )
}

export default Login