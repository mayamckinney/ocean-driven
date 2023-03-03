import React, { useState } from 'react';
import {
    Container,
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
    Button,
    Checkbox
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '', fName: '', lName: '', renter: false });
    const [addUser, { error, data }] = useMutation(ADD_USER);
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

        // create user with user inputs
        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }

        if (data) {
            navigate('/')
        }
    };

    return (
        <main>
            <Container maxW='750px' my='50px' centerContent>
                <form onSubmit={handleFormSubmit}>
                    <FormControl isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input type='email' name="email" value={formState.email} onChange={handleChange} />
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input type='text' name='fName' value={formState.fName} onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input type='text' name='lName' value={formState.lName} onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' name="password" value={formState.password} onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Are you a boat owner looking to rent out your boat?</FormLabel>
                        <Checkbox name='renter' onChange={handleChange} />
                    </FormControl>
                    <Button type='submit'>Sign Up</Button>
                </form>
            </Container>
            {error && (
                <div>
                    {error.message}
                </div>
            )}
        </main>
    )
}

export default Signup