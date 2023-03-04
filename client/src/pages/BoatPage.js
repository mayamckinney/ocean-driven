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
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaUser, FaDollarSign, FaPen } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

import BookingForm from "../components/BookingForm";
import ReviewForm from "../components/ReviewForm";

const BoatPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const location = useLocation();
  const props = location.state.props;
  return (
    <>
      <Box
        mt={24}
        mx={{ base: 2, lg: 0 }}
      >
        {/* Heading Container */}
        <Box mb={2}>
          <Heading as='h3' fontSize='3xl' textAlign='center'>{props.title}</Heading>
          <Text textAlign='center'>{props.boatType}</Text>
        </Box>

        <Grid
          templateColumns='repeat(12, 1fr)'
          gap={2}
        >

          <GridItem colSpan={{ base: 0, lg: 2 }} />

          <GridItem colSpan={{ base: 12, lg: 4 }}>
            {/* Boat Image Card */}
            <Box>


              {/* Button Container */}
              <Box
                mx="auto"
                borderRadius={6}
              >
                {/* Boat Image */}
                <Image src={props.image} width="100%" borderRadius={4} />

                {/* Image Caption */}
                <Text>
                  🔹 Included onboard: water & soft drinks, ice, towels, and a cooler
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
                  <Heading fontSize='2xl' mt={2} mb={2}>Boat Details</Heading>

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
                  <Heading as='h3' mt={10} mb={2} fontSize='2xl'>Features</Heading>

                  <Divider />

                  <UnorderedList listStyleType="none">

                    {/* Food Services */}
                    <ListItem mt={6}>
                      <Text fontSize="md">
                        <Text as='b' mr={2}>Food Services:</Text> {props.foodServices ? " Yes" : " No"}
                      </Text>
                    </ListItem>

                    {/* Music */}
                    <ListItem mt={2}>
                      <Text fontSize="md">
                        <Text as='b' mr={2}>Music:</Text> {props.music ? " Yes" : " No"}
                      </Text>
                    </ListItem>

                    {/* Addtional Features */}
                    <ListItem mt={2} mb={4}>
                      <Text fontSize="md">
                        <Text as='b' mr={2}>Additional Features:</Text> {props.otherFeatures.length > 1 ? props.otherFeatures : 'None'}
                      </Text>
                    </ListItem>

                  </UnorderedList>

                  <Button onClick={onOpen} width='full' mt={4}>
                    Write review
                    <Icon as={FaPen} ml={3} boxSize={3} />
                  </Button>

                </CardBody>
              </Card>

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
            <Heading as='h3' fontSize='3xl'>Add a Reviews</Heading>
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <ReviewForm />
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
