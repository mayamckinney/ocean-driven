import React, { useState } from "react";
import {
  Container,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Text,
  Button,
  Link,
  Box,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import { FaGoogle, FaInstagram, FaFacebook } from "react-icons/fa";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login] = useMutation(LOGIN);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("handleChange", event.target);

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const loginSSO = (provider) => {
    console.log("loginSSO", provider);
    window.location.assign(`/auth/${provider}`);
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log("data", data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Box
    bgImage="url('/images/oceandrivenbglogin.png')"
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
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                mb={2}
              />
            </FormControl>
            <Button type="submit" w='full' mb={2}>Login</Button>
          <HStack>
            <Button w="full" mb={2} onClick={() => loginSSO("google")}>
              <Icon as={FaGoogle} mr={3} />
            </Button>
            <Button w="full" mb={2} onClick={() => loginSSO("instagram")}>
              <Icon as={FaInstagram} mr={3} />
            </Button>
            <Button w="full" mb={2} onClick={() => loginSSO("facebook")}>
              <Icon as={FaFacebook} mr={3} />
            </Button>
          </HStack>
          </form>
        <Text mb={5}>
          No account yet?{" "}
          <Link color="blue" href="../#/signup">
            Sign up
          </Link>{" "}
          instead!
        </Text>
    </Container>
  </Box>
  );
};

export default Login;
