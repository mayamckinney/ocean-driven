import React from "react";
import { Link } from "react-router-dom";

import BoatCard from "../components/BoatCard";
import { SimpleGrid } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { useQuery } from "@apollo/client";
import { QUERY_BOATS, QUERY_USERS } from "../utils/queries";
import { useEffect } from "react";


const BoatTest = () => {

  const { loading, error, data } = useQuery(QUERY_BOATS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let arr= data.boats;

  console.log("boats", arr);

  return (
    <div>
      {/* Add link to BoatForm here */}
      <Button>
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
