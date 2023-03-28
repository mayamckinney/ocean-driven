import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOKING } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import { Box, Container, Text } from '@chakra-ui/react';

const Success = (props) => {
    useEffect(() => {
            setTimeout(() => {
                window.location.assign('/');
            }, 3000);
    }, []);

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
          <Text>
            Payment Successful, returning home
          </Text>
    </Container>
  </Box>
    );
}

export default Success;
