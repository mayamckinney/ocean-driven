import React from "react";

import BoatCard from "../components/BoatCard";
import boatSeed from "./boatSeeds.json";
import { SimpleGrid } from "@chakra-ui/react";

const BoatTest = () => {

  let arr = boatSeed;
  return (
    <div>
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
