import React, { useState } from "react";
import {
  Box,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";

// Test page to see if Chakra UI is working
import BoatsTest from "./BoatsTest";

const Home = () => {
  
  const boatTypes = [
    "Sailboat",
    "Powerboat",
    "Fishing boat",
    "Pontoon boat",
    "Kayak/Canoe",
    "Yacht",
    "Catamaran",
    "Houseboat",
  ];

  const [formState, setFormState] = useState({ destination: '', from: '', to: '', boatType: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    })
  }


  return (
    <Box mt={[ 16, 24, 32 ]}>
      {/* Hero Image */}
      {/* Source: https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F5119297%2Fpexels-photo-5119297.jpeg&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fphoto%2Fsea-landscape-beach-vacation-5119297%2F&tbnid=UcSt2_Ng6zzlQM&vet=12ahUKEwjnwLavj779AhVwO0QIHYXfBDUQMygyegQIARBn..i&docid=aeYbV3eUbsRq4M&w=3264&h=2448&itg=1&q=tropical%20coast&hl=en&ved=2ahUKEwjnwLavj779AhVwO0QIHYXfBDUQMygyegQIARBn */}
      <Box>
        <Image
          src="/images/herood.png"
          alt="a beautiful coast"
          w={'full'}
          h={{ base: '40vh', lg: '50vh' }}
          objectFit='cover'
        />
      </Box>

      {/* Search Form */}
      <Box bgGradient='linear(to-t, secondary.400, secondary.500)' boxShadow='md' w={{ base: "90%", md: "75%" }} mx='auto' my={3} px={5} py={4} borderRadius={6}>
        <FormControl>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}>
            <GridItem w='100%' pr={[2, 3]}>
              <FormLabel color='secondary.50'>Where:</FormLabel>
              <Input
                id='destination'
                name="destination"
                type='text'
                bg='secondary.50'
                onChange={handleChange}
              />
            </GridItem>
            <GridItem w='100%' pr={[2, 3]}>
              <FormLabel mt={{ base: 3, md: 0 }} color='secondary.50'>From:</FormLabel>
              <Input
                type='date'
                id="from"
                name="from"
                bg='secondary.50'
                onChange={handleChange}
              />
            </GridItem>
            <GridItem w='100%' pr={[2, 3]}>
              <FormLabel mt={{ base: 3, md: 0 }} color='secondary.50'>To:</FormLabel>
              <Input
                type='date'
                id="to"
                name="to"
                bg='secondary.50'
                onChange={handleChange}
              />
            </GridItem>
            <GridItem w='100%' pr={[2, 3]}>
              <FormLabel mt={{ base: 3, md: 0 }} color='secondary.50'>Boat:</FormLabel>
              <Select
                id="boatType"
                name="boatType"
                placeholder="Select the type of boat you want to rent..."
                bg='secondary.50'
                onChange={handleChange}
              >
               {boatTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </GridItem>
          </Grid>
        </FormControl>
        <Button type="submit" mt={3} w='full'>Search</Button>
      </Box>

      <BoatsTest />
    </Box>
  );
};

export default Home;
