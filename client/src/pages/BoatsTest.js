import React from "react";
import { Link } from "react-router-dom";

import BoatCard from "../components/BoatCard";
import { SimpleGrid, Button, Box } from "@chakra-ui/react";

import { useQuery } from "@apollo/client";
import { QUERY_BOATS, QUERY_USERS } from "../utils/queries";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOAT } from "../utils/mutations";

function BoatTest() {
  const [addBoat, { error1 }] = useMutation(ADD_BOAT);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { b } = await addBoat({
        variables: {
          image: "https://imaege.com",
          title: "test",
          priceRate: 100,
          description: "test 2",
          destination: "test 3",
          occupancy: 1,
          foodServices: false,
          music: false,
          otherFeatures: ["test 4"],
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const { loading, error, data } = useQuery(QUERY_BOATS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let arr = data.boats;

  return (
    <div>
      {/* Add link to BoatForm here */}
      {/* <Button onClick={handleSubmit}>Test Add a Boat</Button> */}
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
}

export default BoatTest;
