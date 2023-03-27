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
  Checkbox,
  CheckboxGroup,
  Text
} from "@chakra-ui/react";

import { useEffect } from "react";
import { FaCalendarAlt, FaBookOpen } from "react-icons/fa";
import BookingCalendar from "../components/BookingCalendar";

import { useMutation } from "@apollo/client";
import { ADD_BOOKING } from "../utils/mutations";
import Auth from "../utils/auth";

function BookingForm({ props }) {
  const [isDayTrip, setIsDayTrip] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hours, setHours] = useState("");
  const [passengers, setPassengers] = useState("");
  const [bookings, setBookings] = useState([]);
  const [addBooking] = useMutation(ADD_BOOKING);
  const toast = useToast();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const onCalendarClose = () => setIsCalendarOpen(false);
  const onCalendarOpen = () => setIsCalendarOpen(true);

  console.log("Day Trip: " + isDayTrip);

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
          hours,
          passengers,
          user: Auth.getProfile().data.username,
        },
      });

      setStartDate("");
      setEndDate("");
      setHours("");
      setPassengers("");
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

          {/* isDayTrip */}
          <FormControl mb={3}>
            <Checkbox
              colorScheme='quaternary'
              fontWeight='bold'
              value={isDayTrip}
              onChange={() => { setIsDayTrip(!isDayTrip) }}
            >Day-Trip Only</Checkbox>
          </FormControl>

          {/* Changes form view if user wants to book day trip only */}
          {
            isDayTrip ? (
              <Box>
                {/* Date */}
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

                <Flex flexDirection={{ base: "column", md: "row" }} ml={{ md: 2 }}>

                  {/* Hours */}
                  <FormControl mt={{ base: 3, md: 0 }}>
                    <FormLabel>Hours (Day-Trips Only):</FormLabel>
                    <Input
                      type="number"
                      value={hours}
                      onChange={(event) => setHours(Number(event.target.value))}
                      placeholder="4"
                      min="4"
                      bg="secondary.50"
                    />
                  </FormControl>

                  {/* Passengers */}
                  <FormControl mt={{ base: 3, md: 0 }}>
                    <FormLabel>Passengers</FormLabel>
                    <Input
                      type="number"
                      value={passengers}
                      onChange={(event) => setPassengers(Number(event.target.value))}
                      required
                      bg="secondary.50"
                    />
                  </FormControl>

                </Flex>
              </Box>
            ) : (
              <Box>
                {/* Form - First Row */}
                <Flex flexDirection={{ base: "column", md: "row" }}>

                  {/* Start Date */}
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

                  {/* End Date */}
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

                {/* Passengers */}
                <FormControl mt={{ base: 3, md: 0 }}>
                  <FormLabel>Passengers</FormLabel>
                  <Input
                    type="number"
                    value={passengers}
                    onChange={(event) => setPassengers(Number(event.target.value))}
                    required
                    bg="secondary.50"
                  />
                </FormControl>
              </Box>
            )
          }

          {/* Booking Button */}
          <Button p={15} mt={3} w="full" type="submit">
            Book
            <Icon as={FaBookOpen} ml={2} />
          </Button>

          {/* Check Availability Button */}
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

export default BookingForm;
