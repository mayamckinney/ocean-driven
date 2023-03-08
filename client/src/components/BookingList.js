import React, { useState, useEffect } from 'react';
import {
    Box,
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

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_BOATS } from '../utils/queries';
import { REMOVE_BOOKING } from '../utils/mutations';

import Auth from '../utils/auth';

const BookingList = ({ username }) => {
    // State to manage user bookings
    const [bookingData, setBookingData] = useState([]);

    // Queries server for boats
    const { data } = useQuery(QUERY_BOATS);
    const [removeBooking, { error }] = useMutation(REMOVE_BOOKING);

    // Builds an array that only contains boats with bookings
    const bookedBoats = data?.boats.filter(boat => boat.booked?.length > 0) || [];


    // function to find books for this user
    const findUserBookings = (bookedBoats) => {

        // empty array to contain new object with booking data
        const userBookings = []

        // iterates through each boat
        bookedBoats.forEach((boat) => {

            // iterates through each booking and searches for one that matches this user, then builds a new simplified object and pushes it to the userBooking array
            boat.booked.forEach((booking) => {
                if (booking.user === username) {
                    let obj = {
                        boatId: boat._id,
                        title: boat.title,
                        boatType: boat.boatType,
                        image: boat.image,
                        bookingId: booking._id,
                        from: booking.from,
                        to: booking.to
                    }
                    userBookings.push(obj);
                }
                return
            })
        })
        return userBookings;
    }

    const userBookings = findUserBookings(bookedBoats);


    const handleDeleteBooking = async (boatId, bookingId) => {

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await removeBooking({
                variables: {
                    boatId: boatId,
                    bookingId: bookingId
                }
            })

            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <Box mt={{ base: 4, md: 10 }}>
            <Heading as='h3' fontSize='2xl' mt={3}>Bookings:</Heading>

            <Grid
                templateColumns='repeat(12, 1fr)'
                gap={2}
            >
                {
                    userBookings.length > 0
                        ? userBookings.map(boat => {
                            return (
                                <GridItem colSpan={{ base: 12, md: 3 }}>

                                    <Card mt={6}>
                                        <CardBody>

                                            {/* Boat Name */}
                                            <Heading as='h3' textAlign='center' fontSize='xl' mt={3}>{boat.title}</Heading>

                                            {/* Boat Type */}
                                            <Text mb={2} textAlign='center'>{boat.boatType}</Text>

                                            <Divider />

                                            {/* ADD --> Boat Image */}
                                            <Image
                                                src={boat.image} alt='a boat'
                                                mt={6}
                                            />

                                            {/* Booking Date */}
                                            <Box mt={6} border='1px' borderColor='gray.200' p={2}>

                                                <Heading as='h4' fontSize='lg'>Reservation Date:</Heading>

                                                <UnorderedList listStyleType="none" mt={3}>

                                                    {/* From */}
                                                    <ListItem>
                                                        <Text >
                                                            <Text as='b' mr={2}>Check-in: </Text>
                                                            {boat.from}
                                                        </Text>
                                                    </ListItem>

                                                    {/* To */}
                                                    <ListItem mt={3}>
                                                        <Text >
                                                            <Text as='b' mr={2}>Check-out: </Text>{boat.to}
                                                        </Text>
                                                    </ListItem>

                                                </UnorderedList>

                                            </Box>

                                            {/* Cancel Reservation */}
                                            <Button fontSize={{lg: 'lg'}} colorScheme='red' mt={4} w='full' onClick={() => handleDeleteBooking(boat.boatId, boat.bookingId)}>Cancel Reservation</Button>
                                        </CardBody>
                                    </Card>

                                </GridItem>


                            )
                        })
                        : <Text>You have not made any bookings yet.</Text>
                }
            </Grid>

        </Box >
    );
};

export default BookingList;