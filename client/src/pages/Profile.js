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
import BookingList from "../components/BookingList";

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
        <Flex mt={{base: 32, md: 40}} mx={4} flexDirection='column'>
            <Box>
                <Heading as='h2' color='quaternary.700' fontSize='3xl' textAlign={{ base: 'center' }}>Profile</Heading>
            </Box>

            <Grid
                templateColumns='repeat(12, 1fr)'
                gap={2}
            >
                {/* Spacer */}
                {/* <GridItem colSpan={{ base: 0, md: 1, lg: 2 }} /> */}

                {/* Image */}
                <GridItem colSpan={{ base: 12, md: 4, lg: 2 }}>
                    {/* Profile Image */}
                    <Box>
                        <Image
                            src='/images/Profile_Placeholder.jpg'
                            alt='user profile'
                            maxWidth='80%'
                            borderRadius={30}
                            mt={{ base: 3, md: 10 }}
                            mx={{ base: 'auto', md: 'auto' }}
                        />
                    </Box>
                </GridItem>

                {/* Info */}
                <GridItem colSpan={{ base: 12, md: 8, lg: 10 }}>
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
                {/* <GridItem colSpan={{ base: 0, md: 1, lg: 2 }} /> */}

                {/* Bookings/Boat List */}
                <GridItem colSpan={{ base: 12, md: 4 }}>
                    {/* Bookings */}
                    <BookingList />
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
