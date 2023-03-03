import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
} from "@chakra-ui/react";

function BookingForm() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your booking logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack spacing={3}>
        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>End Date</FormLabel>
          <Input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            required
          />
        </FormControl>
        <FormControl>
        <FormLabel>🛥️</FormLabel>
        <Button p={15} type="submit" colorScheme="blue">
          Book
        </Button>
        </FormControl>
      </HStack>
    </form>
  );
}

export default BookingForm;