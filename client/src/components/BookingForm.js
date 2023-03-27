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
  Text
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookings, setBookings] = useState([]);
  const [addBooking] = useMutation(ADD_BOOKING);
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT)
  const toast = useToast();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const onCalendarClose = () => setIsCalendarOpen(false);
  const onCalendarOpen = () => setIsCalendarOpen(true);

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
      getCheckout({
        variables: { 
          boatId: props._id,
          from: `${startDate}`,
          to: `${endDate}`,
          startTime: `${startTime}`,
          endTime: `${endTime}`,
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

          <Accordion allowToggle>

            {/* Enter Date */}
            <AccordionItem border='none'>

              {/* Button/Label */}
              <AccordionButton>
                <Heading as='h6' fontSize='sm'>Enter Date</Heading>
                <AccordionIcon />
              </AccordionButton>

              {/* Content (form items) */}
              <AccordionPanel>
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
              </AccordionPanel>

            </AccordionItem>

            {/* Enter Time */}
            <AccordionItem border='none'>

              {/* Button/Label */}
              <AccordionButton>
                <Heading as='h4' fontSize='sm'>Enter Time</Heading>
                <AccordionIcon />
              </AccordionButton>

              {/* Content (form items) */}
              <AccordionPanel>
                <Flex flexDirection={{ base: "column", md: "row" }}>
                  {/* Start Date */}
                  <FormControl>
                    <FormLabel>Start Time</FormLabel>
                    <Input
                      type="time"
                      min='06:00'
                      max='11:00'
                      value={startTime}
                      onChange={(event) => setStartTime(event.target.value)}
                      required
                      bg="secondary.50"
                    />
                  </FormControl>

                  {/* End Date */}
                  <FormControl mt={{ base: 3, md: 0 }} ml={{ md: 2 }}>
                    <FormLabel>End Time</FormLabel>
                    <Input
                      type="time"
                      min='10:00'
                      max='18:00'
                      value={endTime}
                      onChange={(event) => setEndTime(event.target.value)}
                      required
                      bg="secondary.50"
                    />
                  </FormControl>
                </Flex>

                <Text mt={4} fontSize='sm'>
                  <Text as='b' mr={2}>Please Note:</Text>
                  Bookings for single day trips must be a minimun of 4 hours long.
                </Text>
              </AccordionPanel>

            </AccordionItem>
          </Accordion>

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
