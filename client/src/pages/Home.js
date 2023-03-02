import React from "react";
import { Box, Image } from "@chakra-ui/react";

// Test page to see if Chakra UI is working
import BoatsTest from "./BoatsTest";

const Home = () => {
  return (
    <Box>
      <Box>
        <Image 
          src="/images/placeholder-coast.jpeg" 
          alt="a beautiful coast" 
          w={'full'}
          h={{ base: '50vh', lg:'100vh'}}
          objectFit='cover'
          />
      </Box>

      <BoatsTest />
    </Box>
  );
};

export default Home;
