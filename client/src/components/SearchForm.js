import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { boatTypes, destinations } from "../utils/types";
import { useQuery } from "@apollo/client";
import { QUERY_BOATS } from "../utils/queries";
import { useEffect } from "react";

const SearchForm = ({ images }) => {
  const [formState, setFormState] = useState({
    destination: "All",
    from: "",
    to: "",
    boatType: "All",
  });

  const { loading, error, data } = useQuery(QUERY_BOATS);
  const [boats, setBoats] = useState([]);
  const [showResults, setShowResults] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let allBoats = data.boats;
    let result = [];
    if (formState.destination === "All" && formState.boatType === "All") {
      result = allBoats;
    } else if (formState.destination === "" && formState.boatType !== "All") {
      result = allBoats.filter((boat) => boat.boatType === formState.boatType);
    } else if (formState.destination !== "" && formState.boatType === "All") {
      result = allBoats.filter(
        (boat) => boat.destination === formState.destination
      );
    } else {
      result = allBoats.filter(
        (boat) =>
          boat.destination === formState.destination &&
          boat.boatType === formState.boatType
      );
    }

    // Filter boats by booking dates
    if (formState.from !== "" && formState.to !== "") {
      const from = new Date(formState.from);
      const to = new Date(formState.to);
      result = result.filter((boat) => {
        let available = true;
        boat.booked?.forEach((booking) => {
          const bookingFrom = new Date(booking.from);
          const bookingTo = new Date(booking.to);
          if (
            (from >= bookingFrom && from <= bookingTo) ||
            (to >= bookingFrom && to <= bookingTo)
          ) {
            available = false;
          }
        });
        return available;
      });
    }
    setBoats(result);
    setShowResults(true);
  };

  return (
    <Box
      bgGradient="linear(to-t, secondary.400, secondary.500)"
      boxShadow="md"
      w={{ base: "90%", md: "75%" }}
      mx="auto"
      my={3}
      px={5}
      py={4}
      borderRadius={6}
    >
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
          >
            <GridItem w="100%" pr={[2, 3]}>
              <FormLabel color="secondary.50">Where:</FormLabel>
              <Select
                id="destination"
                name="destination"
                placeholder="Select destination..."
                bg="secondary.50"
                onChange={handleChange}
              >
                <option key={"All"} selected value={"All"}>
                  {"All"}
                </option>
                {destinations.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </GridItem>
            <GridItem w="100%" pr={[2, 3]}>
              <FormLabel mt={{ base: 3, md: 0 }} color="secondary.50">
                From:
              </FormLabel>
              <Input
                type="date"
                id="from"
                name="from"
                bg="secondary.50"
                onChange={handleChange}
              />
            </GridItem>
            <GridItem w="100%" pr={[2, 3]}>
              <FormLabel mt={{ base: 3, md: 0 }} color="secondary.50">
                To:
              </FormLabel>
              <Input
                type="date"
                id="to"
                name="to"
                bg="secondary.50"
                onChange={handleChange}
              />
            </GridItem>
            <GridItem w="100%" pr={[2, 3]}>
              <FormLabel mt={{ base: 3, md: 0 }} color="secondary.50">
                Boat:
              </FormLabel>
              <Select
                id="boatType"
                name="boatType"
                placeholder="Select the type of boat you want to rent..."
                bg="secondary.50"
                onChange={handleChange}
              >
                <option key={"All"} selected value={"All"}>
                  {"All"}
                </option>
                {boatTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </GridItem>
          </Grid>
        </FormControl>
        <Button type="submit" mt={3} w="full">
          Search
        </Button>
      </form>
    </Box>
  );
};

export default SearchForm;
