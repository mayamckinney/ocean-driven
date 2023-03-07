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

const BookingList = ({ username }) => {

    return (

        <Box mt={{ base: 4, md: 10 }}>
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

        </Box >
    );
};

export default BookingList;