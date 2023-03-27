import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  HStack,
} from "@chakra-ui/react";

import { useEffect } from "react";
import { FaCalendarAlt, FaBookOpen } from "react-icons/fa";
import BookingCalendar from "../components/BookingCalendar";

import { useMutation } from "@apollo/client";
import { ADD_BOOKING } from "../utils/mutations";
import Auth from "../utils/auth";

function BookingFormDaily({ props }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
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
          startTime: `${startTime}`,
          endTime: `${startTime}`,
          user: Auth.getProfile().data.username,
        },
      });

      setStartDate("");
      setEndDate("");
      setStartTime("");
      setEndTime("");
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
      toast({
        title: "Booking rejected",
        description: "Please make sure you are logged in and try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
            {/* Start Date */}
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                required
                bg="secondary.50"
              />
            </FormControl>
            {/* Start Date */}
            <FormControl mt={{ base: 3, md: 0 }} ml={{ md: 2 }}>
              <FormLabel>Hours</FormLabel>
              <Input
                type="number"
                min="4"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                required
                bg="secondary.50"
              />
            </FormControl>

            {/* End Date */}
            <FormControl mt={{ base: 3, md: 0 }} ml={{ md: 2 }}>
              <FormLabel>Duration</FormLabel>
              <Input
                type="number"
                min="4"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                required
                bg="secondary.50"
              />
            </FormControl>
          </Flex>
          {/* Booking Button */}
          <HStack>
            <Button p={15} mt={3} w="full" type="submit">
              Book
              <Icon as={FaBookOpen} ml={2} />
            </Button>
            {/* Check Availability Button */}
            <Button p={15} mt={3} w="full" onClick={onCalendarOpen}>
              Check Availability
              <Icon as={FaCalendarAlt} ml={2} />
            </Button>
          </HStack>
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

          {/* Calendar */}
          <ModalBody>
            <BookingCalendar props={bookings} />
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

export default BookingFormDaily;
