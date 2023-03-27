import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOKING } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import { Box, Container, Text } from '@chakra-ui/react';

const Success = (props) => {
    const [addBooking] = useMutation(ADD_BOOKING)
    useEffect(() => {
        async function saveBooking() {
            const booking = await idbPromise('booking', 'get')
            console.log(booking[0])
            const { data } = await addBooking({
                variables: {
                    boatId: booking[0].boatId,
                    from: booking[0].from,
                    to: booking[0].to,
                    startTime: booking[0].startTime,
                    endTime: booking[0].endTime,
                    user: booking[0].user
                },
            });

            console.log(data)

            setTimeout(() => {
                window.location.assign('/');
            }, 3000);
        }

        saveBooking()
    }, [addBooking]);

    return (
        <Box>
            <Container>
                <Text>
                    Thank You!
                </Text>
            </Container>
        </Box>
    );
}

export default Success;
