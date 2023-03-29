import React from "react";
import { Flex, Text, Link } from "@chakra-ui/react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {

    return (
        <Flex w='full' justifyContent='center' alignItems='center' flexDirection='column' py={2} bg='quaternary.500' color='secondary.50' mt={6} bottom={0}>

            {/* Contact Info */}
            <Flex w='full' alignItems='center' justifyContent='center' flexDirection={{ base: 'column', md: 'row' }}>

                {/* Social Links */}
                <Flex mt={{base: 2, md: 0}}>
                    <Link href="https://www.instagram.com/oceandrivensc/" mr={4} fontSize='2xl' isExternal>
                        <FaInstagram />
                    </Link>
                    <Link href="https://www.facebook.com/Oceandrivensc" mr={{ base: 0, md: 10 }} fontSize='2xl' isExternal>
                        <FaFacebook />
                    </Link>
                </Flex>

                {/* Email */}
                <Link href="mailto:oceandrivensancarlos@gmail.com" mr={{ base: 0, md: 10 }} mt={{base: 2, md: 0}}>
                    <Text>oceandrivensancarlos@gmail.com</Text>
                </Link>

                {/* Phone Numbers */}
                <Flex mt={{base: 2, md: 0}}>
                    <Text mr={4}>Tel: 622-100-36-47</Text>
                    <Text>Tel: 622-100-37-29</Text>
                </Flex>
            </Flex>
        </Flex>
    )
};

export default Footer;