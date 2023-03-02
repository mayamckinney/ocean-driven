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
} from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaUser, FaDollarSign } from "react-icons/fa";

const BoatPage = () => {
  const location = useLocation();

  console.log("state", location);
  const props = location.state.props;
  return (
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
          </Card>
          <Text size="lg">
            🔹Included onboard: water & soft drinks, ice, towels, and a cooler
          </Text>
        </Box>
      </Grid>
    </Card>
  );
};

export default BoatPage;
