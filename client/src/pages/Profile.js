import React from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Card,
    CardBody,
    Divider,
    UnorderedList,
    ListItem,
    Button,
    Grid,
    GridItem
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BoatCard from "../components/BoatCard";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";


const Profile = () => {
    // const user = Auth.getProfile().data;

    const { data } = useQuery(QUERY_ME);
    const user = data?.me || {};

    if (!Auth.loggedIn()) {
        return (
            <Heading as='h4' mt={40} textAlign='center'>You must be logged in to view your profile.</Heading>
        )
    }

    return (
        <Flex mt={24} mx={4} flexDirection='column'>
            <Box mb={4}>
                <Heading as='h2' color='quaternary.700' fontSize='3xl' textAlign={{ base: 'center' }}>Profile</Heading>
            </Box>

            <Grid
                templateColumns='repeat(12, 1fr)'
                gap={2}
            >
                {/* Spacer */}
                <GridItem colSpan={{ base: 0, md: 1, lg: 2 }} />

                {/* Image */}
                <GridItem colSpan={{ base: 12, md: 4 }}>
                    {/* Profile Image */}
                    <Box>
                        <Image
                            src='/images/Profile_Placeholder.jpg'
                            alt='user profile'
                            maxWidth='90%'
                            borderRadius={30}
                            mt={{ base: 3, md: 10 }}
                            mx={{ base: 'auto', md: 0 }}
                        />
                    </Box>
                </GridItem>

                {/* Info */}
                <GridItem colSpan={{ base: 12, md: 6, lg: 4 }}>
                    {/* User Info */}
                    <Card mt={{ base: 4, md: 10 }}>
                        <CardBody>

                            <Heading as='h3' fontSize='2xl' mt={3} mb={2}>User Info:</Heading>

                            <Divider />

                            <UnorderedList listStyleType="none" mt={6}>

                                {/* Username */}
                                <ListItem mb={4}>
                                    <Text fontSize='xl'>
                                        <Text as='b' mr={2}>Username: </Text>
                                        {user.username}
                                    </Text>
                                </ListItem>

                                {/* Email */}
                                <ListItem>
                                    <Text fontSize='xl'>
                                        <Text as='b' mr={2}>Email: </Text>
                                        {user.email}
                                    </Text>
                                </ListItem>


                            </UnorderedList>
                        </CardBody>
                    </Card>
                </GridItem>

                {/* Spacer */}
                <GridItem colSpan={{ base: 0, md: 1, lg: 2 }} />

                {/* Bookings */}
                <GridItem colSpan={{ base: 12, md: 4 }}>
                    {/* Bookings */}
                    <Box mt={{ base: 4, md: 10 }} mx={{ base: 0, md: 3, lg: 10 }}>
                        <Heading as='h3' fontSize='2xl' mt={3}>Bookings:</Heading>

                        <Card mt={6}>
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
                </GridItem>
            </Grid>


            {/* Boats */}
            <Box mt={4}>
                <Heading as='h4' fontSize='2xl' mt={3}>Boats:</Heading>
                {/* Load Boat Card that matches user ID */}

                {(user.boats || []).length > 0
                    ? (user.boats || []).map((boat, index) => {
                        return (
                            <div key={index}>
                                <Text>{boat.title}</Text>
                                {/* <BoatCard key={index} props={x}></BoatCard> */}
                            </div>
                        );
                    })
                    : <Text>You have no boats yet</Text>
                    }
            </Box>

        </Flex>
    );
};

export default Profile;
