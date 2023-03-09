import {
  Card,
  CardBody,
  Heading,
  Text,
  Box,
  Stack,
  StackDivider,
  Image,
  Badge,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const BoatCard = ({ props }) => {

  return (
    <Card m={5} maxW='xl'>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box bg={'white.100'}>
            <Link to={{ pathname: "/boat"}} state={{ props }}>
              <Image src={props.image} alt={props.title}/>
            </Link>
            <Badge>from ${props.priceRate} </Badge>
            <Text pt="2" fontSize="sm">
              {props.destination}
            </Text>
          </Box>
          <Box>
            <Heading size="md">
              {props.title}
            </Heading>
            <Text fontSize={"sm"} pt="2">
              {props.boatType}
            </Text>
            <Text pt="2">
              {props.description}
            </Text>
            <Text pt="2">
              Up to {props.occupancy} passangers
            </Text>
          </Box>
          <Box></Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default BoatCard;
