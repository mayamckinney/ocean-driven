import React from "react";
import { Box, Flex, UnorderedList, ListItem, Link, Image, Heading } from "@chakra-ui/react";
import { Link as RouteLink } from 'react-router-dom';
import Auth from "../utils/auth";


const NavBar = () => {

    return (
        <Flex
            bg='white'
            w="full"
            justifyContent='space-between'
            pos='fixed'
            top={0}
            zIndex={1}
            boxShadow='base'
            p={2}
            as="nav"
        >
            <Box alignSelf='center' display='flex'>
                {/* Source: DALL·E */}
                <Image
                    src="/images/icon_placeholder1.png"
                    alt="yacht icon"
                    w={14}
                    borderRadius={30}
                />
                <Box>
                    <Heading as='h1' color='secondary.800' ml={3} mt={{ base: 1, md: 2.5 }} display={{base: 'none', md: 'inline-block'}} fontSize={{ base: 'xl', md: '4xl' }} alignSelf='center'>Ocean Driven</Heading>
                </Box>
            </Box>

            <Flex flexDirection='column' justifyContent='flex-end'>

                <UnorderedList styleType='none' display='flex' mb={2}>
                {!Auth.loggedIn() ? (
                    <>
                    <ListItem> 
                        <Link as={RouteLink} style={{ textDecoration: 'none' }} mr={3} _hover={{ fontWeight: 'semibold', color: 'secondary.700' }} to="/login" >
                            Login
                        </Link>
                    </ListItem> 
                    <ListItem>
                        <Link as={RouteLink} style={{ textDecoration: 'none' }} mr={3} _hover={{ fontWeight: 'semibold', color: 'secondary.700' }} to="/signup" >
                            Signup
                        </Link>
                    </ListItem>
                    </> ) : (
                    <ListItem>
                        <Link as={RouteLink} style={{ textDecoration: 'none' }} mr={4} _hover={{ fontWeight: 'semibold', color: 'secondary.700' }} to="/" onClick={() => Auth.logout()}>
                            Logout
                        </Link>
                    </ListItem> )}
                </UnorderedList>

                <UnorderedList styleType={"none"} display='flex' justifyContent='flex-end'>
                    <ListItem>
                        <Link as={RouteLink} style={{ textDecoration: 'none' }} fontSize={{base: 'lg', md: 'xl'}} mr={2} py={1} px={2} borderRadius='md' _hover={{ background: 'secondary.100', fontWeight: 'semibold' }} to="/">
                            Home
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link as={RouteLink} style={{ textDecoration: 'none' }} fontSize={{base: 'lg', md: 'xl'}} mr={2} py={1} px={2} borderRadius='md' _hover={{ background: 'secondary.100', fontWeight: 'semibold' }} to="/profile">
                            Profile
                        </Link>
                    </ListItem>
                </UnorderedList>
            </Flex>

        </Flex>
    )

};

export default NavBar;
