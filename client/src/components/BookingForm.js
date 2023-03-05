import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  useToast
} from "@chakra-ui/react";

import { useMutation } from "@apollo/client";
import { ADD_BOOKING } from "../utils/mutations";
import Auth from '../utils/auth'

function BookingForm({ props }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [addBooking] = useMutation(ADD_BOOKING);
  const toast = useToast()

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Your booking logic here

    try {
      const { data } = await addBooking({
      variables: {
        boatId: props._id,
        from: `${startDate}`,
        to: `${endDate}`,
        user: Auth.getProfile().data.username
      },
    });
    
    setStartDate("")
    setEndDate("")
    toast({
      title: 'Booking submitted',
      description: 'Thank you!',
      status: 'success',
      duration: 3000,
      isClosable: true
    })
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <Box
      bg="secondary.400"
      boxShadow="base"
      mx="auto"
      my={3}
      p={4}
      borderRadius={6}
    >
      <form onSubmit={handleSubmit}>
        <Flex flexDirection={{base: 'column', md: 'row'}}>
          <FormControl>
            <FormLabel>Start Date</FormLabel>
            <Input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              required
              bg="secondary.50"
            />
          </FormControl>
          <FormControl mt={{base: 3, md: 0}} ml={{md: 2}}>
            <FormLabel>End Date</FormLabel>
            <Input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              required
              bg="secondary.50"
            />
          </FormControl>
        </Flex>
        <Button p={15} mt={3} w='full' type="submit">
          Book
        </Button>
      </form>
    </Box>
  );
}

export default BookingForm;
