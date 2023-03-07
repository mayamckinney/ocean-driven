import React, { useState } from "react";
import {
  Container,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Checkbox,
  Box
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = (props) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    username: "",
    renter: false,
  });

  const [addUser, { error }] = useMutation(ADD_USER);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
console.log(event.target)
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleIsChecked = (event) => {
    const { name, checked } = event.target;
    console.log(event.target)
    setFormState({
        ...formState,
        [name]: checked,
        });
    }

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("form",formState);

    // create user with user inputs
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
    bgImage="url('/images/oceandrivenbgsignup.png')"
    bgPosition="bottom"
    bgSize="cover"
    bgRepeat="no-repeat"
    w='100vw'
    h='100vh'>
      <Container       
      mt={[ 24, 32, 40 ]} 
      maxW='500px'
      bgColor='white'
      p={8}
      boxShadow='lg'
      borderRadius='md'>
        <form onSubmit={handleFormSubmit}>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              mb={2}
            />
            <FormHelperText mb={2}>We'll never share your email.</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleChange}
              mb={2}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              mb={2}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>
              Are you a boat owner looking to rent out your boat?
            </FormLabel>
            <Checkbox name="renter" onChange={handleIsChecked} />
          </FormControl>
          <Button type="submit" w='full' mb={5}>Sign Up</Button>
        </form>
      </Container>
      {error && <div>{error.message}</div>}
    </Box>
  );
};

export default Signup;
