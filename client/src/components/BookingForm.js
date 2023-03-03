import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Box,
} from "@chakra-ui/react";

import { useMutation } from "@apollo/client";
import { ADD_BOOKING } from "../utils/mutations";

function BookingForm({props}) {
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
      boxShadow="md"
      // w={{ base: "95%", md: "95%" }}
      mx="auto"
      my={3}
      p={5}
      borderRadius={6}
    >
      <form onSubmit={handleSubmit}>
        <HStack spacing={3}>
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
          <FormControl>
            <FormLabel>End Date</FormLabel>
            <Input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              required
              bg="secondary.50"
            />
          </FormControl>
        </HStack>
        <Button p={15}  mt={3} w='full' type="submit">
          Book
        </Button>
      </form>
    </Box>
  );
}

export default BookingForm;
