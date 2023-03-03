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
      <Box as="section" mt={24}>
        <Card
          m={5}
          borderWidth="1px"
          borderRadius="md"
          borderColor={"tertiary.100"}
          padding="1"
        >
          <Grid
            templateColumns={["1fr", null, "7fr 3fr"]}
            gap={4}
            autoFlow={["dense", null, "row"]}
          >
            <Box>
              <Image src={props.image} width="100%" />
              <Text size="lg">
                🔹Included onboard: water & soft drinks, ice, towels, and a cooler
              </Text>
            </Box>
            <Box>
              <Card>
                <CardHeader bg={"secondary.100"}>
                  <Heading>{props.title}</Heading>
                  <Text>{props.boatType}</Text>
                </CardHeader>
                <CardBody>
                  <UnorderedList listStyleType="none">
                    <ListItem pb={5}>
                      <Flex alignItems="center">
                        <Icon as={FaMapMarkerAlt} boxSize={6} />
                        <Text>{props.destination}</Text>
                      </Flex>
                    </ListItem>
                    <Divider />
                    <ListItem pb={5}>
                      <Flex alignItems="center">
                        <Icon as={FaUser} boxSize={6} />
                        <Text>Up to {props.occupancy} passengers</Text>
                      </Flex>
                    </ListItem>
                    <ListItem pb={5}>
                      <Flex alignItems="center">
                        <Icon as={FaDollarSign} boxSize={6} />
                        <Text>from ${props.priceRate} USD</Text>
                      </Flex>
                    </ListItem>
                  </UnorderedList>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Heading size="lg">Features</Heading>
                </CardHeader>
                <CardBody>
                  <UnorderedList listStyleType="none">
                    <ListItem pb={5}>
                      <Flex alignItems="center">
                        <Heading size="md">
                          Food Services: {props.foodServices ? " Yes" : " No"}
                        </Heading>
                      </Flex>
                    </ListItem>
                    <ListItem pb={5}>
                      <Flex alignItems="center">
                        <Heading size="md">
                          Music: {props.music ? " Yes" : " No"}
                        </Heading>
                      </Flex>
                    </ListItem>
                    <ListItem pb={5}>
                      <Flex alignItems="center">
                        <Heading size="md">
                          Additional Features: {props.otherFeatures}
                        </Heading>
                      </Flex>
                    </ListItem>
                  </UnorderedList>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Heading size="lg">Boat Details</Heading>
                </CardHeader>
                <CardBody>
                  <Text size="md">{props.description}</Text>
                </CardBody>
                <CardFooter>
                  <BookingForm props={props} />
                </CardFooter>
                <Button onClick={onOpen} width={200}>
                  Write review
                  <Icon as={FaPen} boxSize={6} />
                </Button>
              </Card>
            </Box>
          </Grid>
        </Card>
        <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader bg="secondary.100">Reviews</ModalHeader>
            <ModalCloseButton />
            <ReviewForm />
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default BoatPage;
