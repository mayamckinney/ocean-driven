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
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";

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
    <Box mt={24} mx={{ base: 2, lg: 0 }}>
      <Container maxW="750px" my="50px" centerContent>
        <Container maxW="675px" my="25px" centerContent>
          <form onSubmit={handleFormSubmit}>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit">Login</Button>
          </form>
        </Container>
        <Text>
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
