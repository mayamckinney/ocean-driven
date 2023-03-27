import React, { useEffect, useState } from "react";
import { Link as RouteLink } from 'react-router-dom';
import {
    Box,
    Heading,
    Text,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Grid,
    GridItem,
    Flex,
    Link
} from "@chakra-ui/react";
import BoatForm from "./BoatForm";
import BoatCard from "./BoatCard";

const BoatList = ({ boats }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [boatData, setBoatData] = useState([]);

    useEffect(()=> {
        try {

            
        } catch (error) {
            console.error(error)
        }
    }, [boats])

    return (
        <Box>

            <Flex justifyContent='space-between'>
                <Heading as='h4' fontSize='2xl' mt={3}>Boats:</Heading>

                {/* Add Boat Button --> opens modal */}
                <Button onClick={onOpen} colorScheme='primary'>Add a Boat</Button>
            </Flex>


            {/* Boat Form Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>

                    {/* Boat Form Header */}
                    <ModalHeader bg='primary.100'>
                        <Heading as='h4' fontSize='3xl' textAlign='center'>
                            Add a Boat
                        </Heading>
                    </ModalHeader>
                    <ModalCloseButton />

                    {/* Boat Form */}
                    <ModalBody>
                        <BoatForm />
                    </ModalBody>

                </ModalContent>
            </Modal>


            {/* Load Boat Card that matches user ID */}
            <Grid
                templateColumns='repeat(12, 1fr)'
                gap={2}
            >
                {boats?.length > 0
                    ? boats?.map((boat, index) => {
                        return (

                            <GridItem key={index} colSpan={{ base: 12, md: 4 }}>
                                <div key={index}>
                                    <BoatCard key={index} props={boat}></BoatCard>
                                    <Link as={RouteLink} state={boat} style={{ textDecoration: 'none' }} fontSize={{base: 'lg', md: 'xl'}} mr={2} py={1} px={2} borderRadius='md' _hover={{ background: 'secondary.100', fontWeight: 'semibold' }} to="/boat-edit">
                                        Edit
                                    </Link>
                                </div>
                            </GridItem>

                        );
                    })
                    : <Text>You have no boats yet</Text>
                }
            </Grid>

        </Box>
    );
};

export default BoatList;