import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Box,
  Flex,
} from "@chakra-ui/react";

import { useMutation } from "@apollo/client";
import { ADD_BOOKING } from "../utils/mutations";

function BookingForm({ props }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [addBooking, { error }] = useMutation(ADD_BOOKING);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your booking logic here
    let boatID = props._id;

    const mutationResponse = addBooking({
      variables: {
        boatId: boatID,
        from: `${startDate}`,
        to: `${endDate}`,
        user: "user"
      },
    });

    console.log(mutationResponse);
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
