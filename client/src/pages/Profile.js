import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
} from '@chakra-ui/react'

const Profile = () => {

    return (
        <Flex mt={24} mx={4} flexDirection='column'>
            <Box>
                <Heading as='h2' color='quaternary.700' fontSize='3xl'>Profile</Heading>
            </Box>

            {/* Profile Image */}
            <Box>
                <Image
                    src='/images/Profile_Placeholder.jpg'
                    alt='user profile'
                    maxWidth={{ base: '90%', md: '40%', lg: '20%' }}
                    borderRadius={30}
                />
            </Box>

            {/* User Info */}
            <Box>
                <Heading as='h4' fontSize='2xl' mt={3}>User Info:</Heading>
                {/* Username */}
                <Text fontSize='xl' mt={2}>
                    <Text as='b'>Username: </Text>Fozzi Bear
                </Text>
                {/* Email */}
                <Text fontSize='xl' mt={1}>
                    <Text as='b'>Email: </Text>fozzi@wakawaka.com
                </Text>
            </Box>

            {/* Boats */}
            <Box>
                <Heading as='h4' fontSize='2xl' mt={3}>Boats:</Heading>
                {/* Load Boat Card that matches user ID */}

            </Box>
            {/* Reviews */}
            <Box as='form'>
                
            </Box>
        </Flex>
    );
};

export default Profile;