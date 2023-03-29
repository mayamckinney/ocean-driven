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
  HStack,
} from "@chakra-ui/react";
import { React, useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaUser,
  FaDollarSign,
  FaPen,
  FaImages,
} from "react-icons/fa";
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
import ReviewForm from "../components/ReviewForm";
import ImageUploadForm from "../components/ImageUploadForm";
import ImageGallery from "../components/ImageGallery";
import CloudinaryForm from "../components/CloudinaryForm";

import useFetchData from "../hooks/useFetchData";
import useCloudinary from "../hooks/useCloudinary";

const BoatEdit = () => {
  const location = useLocation();
  const props = location.state;

  const [isOpen, setIsOpen] = useState(false);
  const [isImagesOpen, setImagesIsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [images, setImages] = useState([]);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const onImagesClose = () => setImagesIsOpen(false);
  const onImagesOpen = () => setImagesIsOpen(true);

  const onCalendarClose = () => setIsCalendarOpen(false);
  const onCalendarOpen = () => setIsCalendarOpen(true);

  // const { isLoading, response, error } = useFetchData(`/api/boat/images/${props._id}`);
  const { isLoading, response, error } = useCloudinary(props?.title);

  useEffect(() => {
    if (!isLoading && response) {
      // Append the path to the image
      setImages(response);
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
        <Box
          boxShadow="md"
          w={{ base: "90%", md: "75%" }}
          mx="auto"
          my={3}
          px={5}
          py={4}
          borderRadius={6}
        >
          <Box>
            <Card>
              {/* <CardBody> */}
              <HStack>
                <Box>
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
                </Box>
                {/* Features */}
                <Box>
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
                    <ListItem mt={2} mb={4}>
                      <Button onClick={onImagesOpen} width="full" mt={4}>
                        Upload
                        <Icon as={FaImages} ml={3} boxSize={3} />
                      </Button>
                      {/* <Button onClick={onOpen} mt={4}>
                        Reviews
                        <Icon as={FaPen} ml={3} boxSize={3} />
                      </Button> */}
                    </ListItem>
                  </UnorderedList>
                </Box>
              </HStack>
              {/* </CardBody> */}
            </Card>
          </Box>
          <ImageGallery images={images} />
        </Box>
        
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
      <Modal isOpen={isImagesOpen} onClose={onImagesClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          {/* Modal Header */}
          <ModalHeader bg="secondary.100">
            <Heading as="h3" fontSize="3xl">
              Add Pictures
            </Heading>
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <CloudinaryForm props={props} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BoatEdit;
