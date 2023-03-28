import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Box,
  Image,
  Grid,
  Icon,
  Flex,
  UnorderedList,
  ListItem,
  Divider,
  Button,
  GridItem,
} from "@chakra-ui/react";
import { React, useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaUser, FaDollarSign, FaPen, FaImages } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

import Carousel from "../components/ImageCarousel";
import BookingForm from "../components/BookingForm";
import BookingFormDaily from "../components/BookingFormDaily";
import ReviewForm from "../components/ReviewForm";
import useFetchData from "../hooks/useFetchData";
import WeatherPanel from "../components/WeatherPanel";


function BoatPage () {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [images , setImages] = useState([]);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const onCalendarClose = () => setIsCalendarOpen(false);
  const onCalendarOpen = () => setIsCalendarOpen(true);

  const location = useLocation();
  const props = location.state.props;

  const { isLoading, response, error } = useFetchData(`/api/boat/images/${props._id}`);

  useEffect(() => {
    if (!isLoading && response) {
      // Append the path to the image
      const imgs = response.map((image) => `images/${props._id}/${image}`);
      if(imgs.length > 0){
        setImages(imgs);
      }else{ 
        setImages([props.image]);
      }

      console.log("Images: ", images)
    }
  }, [isLoading, response]);

  return (
    <>
      <Box mt={36} mx={{ base: 2, lg: 0 }}>
        {/* Heading Container */}
        <Box mb={2}>
          <Heading as="h3" fontSize="3xl" textAlign="center">
            {props.title}
          </Heading>
          <Text textAlign="center">{props.boatType}</Text>
        </Box>

        <Grid templateColumns="repeat(12, 1fr)" gap={2}>
          <GridItem colSpan={{ base: 0, lg: 2 }} />

          <GridItem colSpan={{ base: 12, lg: 4 }}>

            {/* Boat Image Card */}
            <Box>
              <Box mx="auto" borderRadius={6}>

                {/* Boat Image --> ADD CAROUSEL HERE */}
                {/* <Image src={props.image} width="100%" borderRadius={4} /> */}
                <Carousel images={images}/>

                {/* Image Caption */}
                <Text>
                  🔹 Included onboard: water & soft drinks, ice, towels, and a
                  cooler
                  {/* Add a small icon with a + sign to indicate that there are more */}
                </Text>

                {/* Booking Form */}
                <BookingForm props={props} />
              </Box>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 12, lg: 4 }}>
            {/* Boat Info Card */}
            <Box>
              <Card>
                <CardBody>
                  {/* Boat Details */}
                  <Heading fontSize="2xl" mt={2} mb={2}>
                    Boat Details
                  </Heading>

                  <Divider />

                  <Text mt={6}>{props.description}</Text>

                  <UnorderedList listStyleType="none" mt={4}>
                    {/* Destination */}
                    <ListItem mb={4}>
                      <Flex alignItems="center">
                        <Icon as={FaMapMarkerAlt} mr={3} boxSize={4} />
                        <Text>{props.destination}</Text>
                      </Flex>
                    </ListItem>

                    {/* Passengers */}
                    <ListItem mt={4}>
                      <Flex alignItems="center">
                        <Icon as={FaUser} mr={3} boxSize={4} />
                        <Text>Up to {props.occupancy} passengers</Text>
                      </Flex>
                    </ListItem>

                    {/* Price Rate */}
                    <ListItem mt={4}>
                      <Flex alignItems="center">
                        <Icon as={FaDollarSign} mr={3} boxSize={5} />
                        <Text>from ${props.priceRate} USD</Text>
                      </Flex>
                    </ListItem>
                  </UnorderedList>

                  {/* Features */}
                  <Heading as="h3" mt={10} mb={2} fontSize="2xl">
                    Features
                  </Heading>

                  <Divider />

                  <UnorderedList listStyleType="none">
                    {/* Food Services */}
                    <ListItem mt={6}>
                      <Text fontSize="md">
                        <Text as="b" mr={2}>
                          Food Services:
                        </Text>{" "}
                        {props.foodServices ? " Yes" : " No"}
                      </Text>
                    </ListItem>

                    {/* Music */}
                    <ListItem mt={2}>
                      <Text fontSize="md">
                        <Text as="b" mr={2}>
                          Music:
                        </Text>{" "}
                        {props.music ? " Yes" : " No"}
                      </Text>
                    </ListItem>

                    {/* Addtional Features */}
                    <ListItem mt={2} mb={4}>
                      <Text fontSize="md">
                        <Text as="b" mr={2}>
                          Additional Features:
                        </Text>{" "}
                        {props.otherFeatures?.length > 1
                          ? props.otherFeatures
                          : "None"}
                      </Text>
                    </ListItem>
                  </UnorderedList>

                  <Button onClick={onOpen} width="full" mt={4}>
                    Write review
                    <Icon as={FaPen} ml={3} boxSize={3} />
                  </Button>
                </CardBody>
              </Card>
              <WeatherPanel props={props} />
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 0, lg: 2 }} />
        </Grid>
      </Box>
      {/* Review Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          {/* Modal Header */}
          <ModalHeader bg="secondary.100">
            <Heading as="h3" fontSize="3xl">
              Add a Reviews
            </Heading>
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <ReviewForm props={props} />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BoatPage;
