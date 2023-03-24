import React from "react";
import { Box, Flex,  Spacer, Text, Link, IconButton } from "@chakra-ui/react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {

    return (
        <Flex w='full' justifyContent='center' alignItems='center' flexDirection='column' py={2} bg='quaternary.500' color='secondary.50' mt={6} bottom={0}>

            {/* Contact Info */}
            <Flex w='full' alignItems='center' justifyContent='center'>
                <Link href="https://www.instagram.com/oceandrivensc/" mr={4} fontSize='2xl' isExternal>
                    <FaInstagram />
                </Link>
                <Link href="https://www.facebook.com/Oceandrivensc" mr={10} fontSize='2xl' isExternal>
                    <FaFacebook />
                </Link>
                <Link href="mailto:oceandrivensancarlos@gmail.com" mr={10}>
                    <Text>oceandrivensancarlos@gmail.com</Text>
                </Link>
                <Text mr={4}>Tel: 622-100-36-47</Text>
                <Text>Tel: 622-100-37-29</Text>
            </Flex>
        </Flex>
    )
};

export default Footer;