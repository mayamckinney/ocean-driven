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
  Checkbox
} from "@chakra-ui/react";

import { useEffect } from "react";
import { FaCalendarAlt, FaBookOpen } from "react-icons/fa";
import BookingCalendar from "../components/BookingCalendar";
import { loadStripe } from '@stripe/stripe-js';

import { useMutation, useLazyQuery } from "@apollo/client";
import { ADD_BOOKING } from "../utils/mutations";
import { QUERY_CHECKOUT } from "../utils/queries"
import Auth from "../utils/auth";
import { idbPromise } from "../utils/helpers";

function BookingForm({ props }) {
  const [isDayTrip, setIsDayTrip] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hours, setHours] = useState("");
  const [passengers, setPassengers] = useState("");
  const [bookings, setBookings] = useState([]);
  const [addBooking] = useMutation(ADD_BOOKING);
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT)
  const toast = useToast();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const onCalendarClose = () => setIsCalendarOpen(false);
  const onCalendarOpen = () => setIsCalendarOpen(true);

  // Stripe (local storage?)
  const stripePromise = loadStripe('pk_test_51Mlkl2B4isP22xRkEuqoS88b0ddSQDJQrMPSoD0DWxh8EVIFNj7Zhwqu8g19n4OYucrw1Ld6yrtwURsJNXqHcQAR009eCt8weO');

  useEffect(() => {
    setBookings(props.booked);
  }, [props.booked]);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Your booking logic here
    
    idbPromise('booking', 'put', { boatId: props._id, from: `${startDate}`, to: `${endDate}`, startTime: `${startTime}`, endTime: `${endTime}`, user: Auth.getProfile().data.username })
    try {

      // Booking Logic
      // If isDayTrip from and to get value from startDate
      if (isDayTrip) {

        const { data } = await addBooking({
          variables: {
            boatId: props._id,
            from: `${startDate}`,
            to: `${startDate}`,
            hours,
            passengers,
            user: Auth.getProfile().data.username,
          },
        });

        const bookings = data.addBooking.booked;
        setBookings(bookings);

      } else {
        // Value of startDate and endDate used for from and to; hours gets value of 99
        const { data } = await addBooking({
          variables: {
            boatId: props._id,
            from: `${startDate}`,
            to: `${endDate}`,
            hours: 99,
            passengers,
            user: Auth.getProfile().data.username,
          },
        });

        const bookings = data.addBooking.booked;
        setBookings(bookings);
      }
      
      // Stripe Logic
      getCheckout({
        variables: { 
          boatId: props._id,
          from: `${startDate}`,
          to: `${endDate}`,
          startTime: `${startTime}`,
          endTime: `${endTime}`,
         },
      });

      // Resets
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

                <Flex flexDirection={{ base: "column", md: "row" }} mt={4}>

                  {/* Hours */}
                  <FormControl mt={{ base: 3, md: 0 }}>
                    <FormLabel>Hours:</FormLabel>
                    <Input
                      type="number"
                      value={hours}
                      onChange={(event) => setHours(Number(event.target.value))}
                      placeholder="4 hour minimum"
                      min="4"
                      bg="secondary.50"
                    />
                  </FormControl>

                  {/* Passengers */}
                  <FormControl mt={{ base: 3, md: 0 }} ml={{ md: 2 }}>
                    <FormLabel>Passengers</FormLabel>
                    <Input
                      type="number"
                      value={passengers}
                      onChange={(event) => setPassengers(Number(event.target.value))}
                      required
                      bg="secondary.50"
                      placeholder="Number of passengers"
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
                <FormControl mt={3}>
                  <FormLabel>Passengers:</FormLabel>
                  <Input
                    type="number"
                    value={passengers}
                    onChange={(event) => setPassengers(Number(event.target.value))}
                    required
                    bg="secondary.50"
                    placeholder="Enter number of passengers"
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
