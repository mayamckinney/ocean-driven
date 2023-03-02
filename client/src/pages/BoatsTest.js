import React from "react";
import { Link } from "react-router-dom";

import BoatCard from "../components/BoatCard";
import boatSeed from "./boatSeeds.json";
import { SimpleGrid } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const BoatTest = () => {
  let arr = boatSeed;
  return (
    <div>
      {/* Add link to BoatForm here */}
      <Button colorScheme="teal" variant="solid">
        <Link to="/boatform">Add a Boat</Link>
      </Button>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {arr.map((x, index) => {
          return (
            <div key={index}>
              <BoatCard key={index} props={x}></BoatCard>
            </div>
          );
        })}
      </SimpleGrid>
    </div>
  );
};

export default BoatTest;
