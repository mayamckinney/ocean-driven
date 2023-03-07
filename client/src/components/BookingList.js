import React from 'react';
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
} from "@chakra-ui/react";

import { useQuery } from "@apollo/client";
import { QUERY_BOATS } from '../utils/queries';

const BookingList = ({ username }) => {

    // Queries server for boats
    const { data } = useQuery(QUERY_BOATS);

    // Builds an array that only contains boats with bookings
    const bookedBoats =  data?.boats.filter(boat => boat.booked.length > 0) || [];

    // function to find books for this user
    const findUserBookings = (bookedBoats) => {

        // empty array to contain new object with booking data
        const userBookings = []

        // iterates through each boat
        bookedBoats.forEach((boat) => {

            // iterates through each booking and searches for one that matches this user, then builds a new simplified object and pushes it to the userBooking array
            boat.booked.forEach((booking) =>{
                if (booking.user === username) {
                    let obj = {
                        _id: boat._id,
                        title: boat.title,
                        boatType: boat.boatType,
                        image: boat.image,
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

    // console.log('---Data---')
    // console.log(data)
    console.log('---bookedBoats---')
    // console.log(bookedBoats)
    console.log(findUserBookings(bookedBoats));

    const userBookings = findUserBookings(bookedBoats);

    return (

        <Box mt={{ base: 4, md: 10 }}>
            <Heading as='h3' fontSize='2xl' mt={3}>Bookings:</Heading>

            {
                userBookings.length > 0
                ? userBookings.map(boat => {
                    return (
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
                                <Button fontSize='lg' colorScheme='red' mt={4} w='full'>Cancel Reservation</Button>
                            </CardBody>
                        </Card>

                    )
                })
                : <Text>You have not made any bookings yet.</Text>
            }
        </Box >
    );
};

export default BookingList;