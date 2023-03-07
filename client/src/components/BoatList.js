import React from "react";
import {
    Box,
    Heading,
    Text,
} from "@chakra-ui/react";
import BoatCard from "./BoatCard";

const BoatList = ({ boats }) => {

    return (
        <Box mt={4}>
                <Heading as='h4' fontSize='2xl' mt={3}>Boats:</Heading>
                {/* Load Boat Card that matches user ID */}

                {(boats || []).length > 0
                    ? (boats || []).map((boat, index) => {
                        return (
                            <div key={index}>
                                <Text>{boat.title}</Text>
                                {/* <BoatCard key={index} props={x}></BoatCard> */}
                            </div>
                        );
                    })
                    : <Text>You have no boats yet</Text>
                    }
            </Box>
    );
};

export default BoatList;