import React from "react";
import { Link } from "react-router-dom";

import BoatCard from "../components/BoatCard";
import { SimpleGrid, Button, Box } from "@chakra-ui/react";

function BoatTest({ boats }) {
  return (
    <div>
      {/* Add link to BoatForm here */}
      {/* <Button onClick={handleSubmit}>Test Add a Boat</Button> */}
      <Box
        bgGradient="linear(to-t, secondary.50, secondary.100)"
        boxShadow="md"
        w={{ base: "90%", md: "75%" }}
        mx="auto"
        my={3}
        px={5}
        py={4}
        borderRadius={6}
      >
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {boats.map((x, index) => {
            return (
              <div key={index}>
                <BoatCard key={index} props={x}></BoatCard>
              </div>
            );
          })}
        </SimpleGrid>
      </Box>
    </div>
  );
}

export default BoatTest;
