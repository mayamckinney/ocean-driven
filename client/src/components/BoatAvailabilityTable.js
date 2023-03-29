import React from "react";
import {
  Box,
  Text,
  Grid,
  GridItem,
  Image,
  VStack,
  HStack
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

function isBoatAvailableAtHour(boat, hour) {
  // Loop through the boat's booked list to see if it overlaps with the given hour
  for (let i = 0; i < boat.booked.length; i++) {
    const { fromDate, hours } = boat.booked[i];
    const bookedStartHour = new Date(fromDate).getHours(); // Extract the start hour from the fromDate

    // Check if the given hour falls within the booked hours range
    if (hour >= bookedStartHour && hour < bookedStartHour + hours) {
      return false; // Boat is not available
    }
  }

  return true; // Boat is available
}

const BoatAvailabilityTable = ({ boats }) => {
  return (
    <HStack
      overflowX="scroll"
      pb={1}
      sx={{
        "&::-webkit-scrollbar": {
          width: "100%",
          height: "10px",
          borderRadius: "8px",
          backgroundColor: `secondary.50`,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: `secondary.200`,
          borderRadius: "8px",
        },
      }}
    >
      <Grid templateColumns="repeat(15, 1fr)" gap={1}>
        <GridItem colSpan={1}>
          <Text fontWeight="bold">Boats</Text>
          {boats.map((boat) => (
            <Box
              key={boat._id}
              boxSize={20}
              display="flex"
              alignItems="center"
              mt={2}
            >
              <VStack>
                {/* <Image src={boat.image} alt={boat.title} boxSize={20} objectFit="cover" mr={2} /> */}
                <Link to={{ pathname: "/boat" }} state={ {props: boat} }>
                  <Text fontSize={"xl"}>{boat.title}</Text>
                </Link>
              </VStack>
            </Box>
          ))}
        </GridItem>
        {Array.from({ length: 14 }).map((_, index) => (
          <GridItem key={index + 1}>
            <Text fontWeight="bold">{`${index + 5}:00`}</Text>
            {boats.map((boat) => (
              <Box key={boat._id} mt={2}>
                {isBoatAvailableAtHour(boat, index + 1) ? (
                  <Box bg="green.100" boxSize={20}>
                    <Text color="white"></Text>
                  </Box>
                ) : (
                  <Box bg="red.500" boxSize={20}>
                    <Text color="white"></Text>
                  </Box>
                )}
              </Box>
            ))}
          </GridItem>
        ))}
      </Grid>
    </HStack>
  );
};

export default BoatAvailabilityTable;
