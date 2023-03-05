import React from "react";
import { Box, Flex, Heading, Text, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BoatCard from "../components/BoatCard";
import Auth from "../utils/auth";

const Profile = () => {
  const user = Auth.getProfile().data;
  return (
    <Flex mt={24} mx={4} flexDirection="column">
      <Box>
        <Heading as="h2" color="quaternary.700" fontSize="3xl">
          Profile
        </Heading>
      </Box>

      {/* Profile Image */}
      <Box>
        <Image
          src="/images/Profile_Placeholder.jpg"
          alt="user profile"
          maxWidth={{ base: "90%", md: "40%", lg: "20%" }}
          borderRadius={30}
        />
      </Box>

      {/* User Info */}
      <Box>
        <Heading as="h4" fontSize="2xl" mt={3}>
          User Info:
        </Heading>
        {/* Username */}
        <Text fontSize="xl" mt={2}>
          <Text as="b">Username: </Text>
          {user.username}
        </Text>
        {/* Email */}
        <Text fontSize="xl" mt={1}>
          <Text as="b">Email: </Text>
          {user.email}
        </Text>
      </Box>

      {/* Boats */}
      <Box>
      <Button maxWidth={{ base: "90%", md: "40%", lg: "20%" }} >
        <Link to="/boatform">Add Boat</Link>
      </Button>
        <Heading as="h4" fontSize="2xl" mt={3}>
          Boats:
        </Heading>
        {/* Load Boat Card that matches user ID */}

        {(user.boats || []).map((boat, index) => {
          return (
            <div key={index}>
              <Text>{boat.title}</Text>
              {/* <BoatCard key={index} props={x}></BoatCard> */}
            </div>
          );
        })}
      </Box>
      {/* Reviews */}
      <Box as="form"></Box>
    </Flex>
  );
};

export default Profile;
