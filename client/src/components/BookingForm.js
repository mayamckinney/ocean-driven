import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  useToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Icon
} from "@chakra-ui/react";

import { useEffect } from "react";
import { FaCalendarAlt, FaBookOpen } from "react-icons/fa";
import BookingCalendar from "../components/BookingCalendar";

import { useMutation } from "@apollo/client";
import { ADD_BOOKING } from "../utils/mutations";
import Auth from "../utils/auth";

function BookingForm({ props }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [addBooking] = useMutation(ADD_BOOKING);
  const toast = useToast();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const onCalendarClose = () => setIsCalendarOpen(false);
  const onCalendarOpen = () => setIsCalendarOpen(true);

  
  useEffect(() => {
    setBookings(props.booked);
  }, [props.booked]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Your booking logic here
    try {
      const { data } = await addBooking({
        variables: {
          boatId: props._id,
          from: `${startDate}`,
          to: `${endDate}`,
          user: Auth.getProfile().data.username,
        },
      });

      setStartDate("");
      setEndDate("");
      toast({
        title: "Booking submitted",
        description: "Thank you!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      const bookings = data.addBooking.booked;
      setBookings(bookings);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <Box
      bg="secondary.400"
      boxShadow="base"
      mx="auto"
      my={3}
      p={4}
      borderRadius={6}
    >
      <form onSubmit={handleSubmit}>
        <Flex flexDirection={{ base: "column", md: "row" }}>
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
          <FormControl mt={{ base: 3, md: 0 }} ml={{ md: 2 }}>
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
        <Button p={15} mt={3} w="full" type="submit">
          Book
          <Icon as={FaBookOpen} ml={2} />
        </Button>
        <Button p={15} mt={3} w="full" onClick={onCalendarOpen}>
          Check Availability
          <Icon as={FaCalendarAlt} ml={2} />
        </Button>
      </form>
    </Box>
     {/* Booking Calendar Modal */}
     <Modal isOpen={isCalendarOpen} onClose={onCalendarClose} size={"3xl"}>
     <ModalOverlay />
     <ModalContent>
       {/* Modal Header */}
       <ModalHeader bg="secondary.100">
         <Heading as="h3" fontSize="3xl">
           Booking Calendar
         </Heading>
       </ModalHeader>

       <ModalCloseButton />

       <ModalBody>
         <BookingCalendar props={props.booked} />
       </ModalBody>

       <ModalFooter>
         <Button mr={3} onClick={onCalendarClose}>
           Close
         </Button>
       </ModalFooter>
     </ModalContent>
   </Modal>
   </>
  );
}

export default BookingForm;
