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
            zIndex={2}
            boxShadow='base'
            p={2}
            as="nav"
        >
            <Box alignSelf='center' display='flex'>
                {/* Source: DALL·E */}
{/*                 <Image
                    src="/images/icon_placeholder1.png"
                    alt="yacht icon"
                    w={14}
                    borderRadius={30}
                /> */}
                <Box>
                    <Image
                        src="/images/oceandrivenlogo.png"
                        alt="ocean driven logo"
                        w={300}
                    />
                </Box>
            </Box>

            <Flex flexDirection='column' justifyContent='space-around' alignItems='flex-end' >

                {/* Top row */}
                <UnorderedList styleType='none' display='flex' mb={2} justifyContent='flex-end'>
                {!Auth.loggedIn() ? (
                    <>
                    <ListItem> 
                        <Link as={RouteLink} style={{ textDecoration: 'none' }} mr={3} _hover={{ fontWeight: 'semibold', color: 'secondary.700' }} to="/login" >
                            Login
                        </Link>
                    </ListItem> 
                    <ListItem>
                        <Link as={RouteLink} style={{ textDecoration: 'none' }} mr={5} _hover={{ fontWeight: 'semibold', color: 'secondary.700' }} to="/signup" >
                            Signup
                        </Link>
                    </ListItem>
                    </> ) : (
                    <ListItem>
                        <Link as={RouteLink} style={{ textDecoration: 'none' }} mr={5} _hover={{ fontWeight: 'semibold', color: 'secondary.700' }} to="/" onClick={() => Auth.logout()}>
                            Logout
                        </Link>
                    </ListItem> )}
                </UnorderedList>

                {/* Second Row */}
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
