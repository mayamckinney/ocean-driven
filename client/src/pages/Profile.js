import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Card,
    CardBody,
    CardFooter,
    Divider,
    UnorderedList,
    ListItem,
    Button
} from '@chakra-ui/react'

const Profile = () => {

    return (
        <Flex mt={24} mx={4} flexDirection='column'>
            <Box>
                <Heading as='h2' color='quaternary.700' fontSize='3xl' textAlign={{ base: 'center' }}>Profile</Heading>
            </Box>

            {/* Profile Image */}
            <Box>
                <Image
                    src='/images/Profile_Placeholder.jpg'
                    alt='user profile'
                    maxWidth={{ base: '90%', md: '40%', lg: '20%' }}
                    borderRadius={30}
                    mt={3}
                    mx={{ base: 'auto' }}
                />
            </Box>

            {/* User Info */}
            <Card mt={{ base: 4 }}>
                <CardBody>

                    <Heading as='h3' fontSize='2xl' mt={3} mb={2}>User Info:</Heading>

                    <Divider />

                    <UnorderedList listStyleType="none" mt={6}>

                        {/* Username */}
                        <ListItem mb={4}>
                            <Text fontSize='xl'>
                                <Text as='b' mr={2}>Username: </Text>Fozzi Bear
                            </Text>
                        </ListItem>

                        {/* Email */}
                        <ListItem>
                            <Text fontSize='xl'>
                                <Text as='b' mr={2}>Email: </Text>fozzi@wakawaka.com
                            </Text>
                        </ListItem>


                    </UnorderedList>
                </CardBody>
            </Card>

            {/* Bookings */}
            <Box mt={4}>
                <Heading as='h3' fontSize='2xl' mt={3}>Bookings:</Heading>

                <Card>
                    <CardBody>

                        {/* Boat Name */}
                        <Heading as='h3' textAlign='center' fontSize='xl' mt={3}>Splashy McBoat</Heading>

                        {/* Boat Type */}
                        <Text mb={2} textAlign='center'>Yacht</Text>

                        <Divider />

                        {/* ADD --> Boat Image */}
                        <Image
                            src='/images/boat2.jpg' alt='a boat'
                            mt={6}
                        />

                        {/* Booking Date */}
                        <Box mt={6} border='1px' borderColor='gray.200' p={2}>

                            <Heading as='h4' fontSize='lg'>Reservation Date:</Heading>

                            <UnorderedList listStyleType="none" mt={3}>
                                
                                {/* From */}
                                <ListItem>
                                    <Text >
                                        <Text as='b' mr={2}>Check-in: </Text>03/03/2023
                                    </Text>
                                </ListItem>

                                {/* To */}
                                <ListItem mt={3}>
                                    <Text >
                                        <Text as='b' mr={2}>Check-out: </Text>03/05/2023
                                    </Text>
                                </ListItem>

                            </UnorderedList>

                        </Box>

                        {/* Cancel Reservation */}
                        <Button fontSize='lg' colorScheme='red' mt={4} w='full'>Cancel Reservation</Button>
                    </CardBody>
                </Card>

            </Box>

            {/* Boats */}
            <Box mt={4}>
                <Heading as='h4' fontSize='2xl' mt={3}>Boats:</Heading>
                {/* Load Boat Card that matches user ID */}

            </Box>
        </Flex>
    );
};

export default Profile;