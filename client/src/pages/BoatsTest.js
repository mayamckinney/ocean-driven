import React from "react";
import { Link } from "react-router-dom";

import BoatCard from "../components/BoatCard";
import { SimpleGrid, Button, Box } from "@chakra-ui/react";

function BoatTest({ boats }) {

  return (
    <div>
      {/* Add link to BoatForm here */}
      {/* <Button onClick={handleSubmit}>Test Add a Boat</Button> */}
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {boats.map((x, index) => {
          return (
            <div key={index}>
              <BoatCard key={index} props={x}></BoatCard>
            </div>
          );
        })}
      </SimpleGrid>
    </div>
  );
}

export default BoatTest;
