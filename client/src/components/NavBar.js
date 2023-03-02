import React from "react";
import { Flex, UnorderedList, ListItem, Link } from "@chakra-ui/react";


const NavBar = () => {

    return (
        <Flex bg={'primary.50'} w={"full"} h={10} justifyContent='flex-end'>
            <UnorderedList styleType={"none"}>
                <ListItem p={2}>
                    <Link style={{ textDecoration: 'none' }} mx={2} href="/home">
                        Home
                    </Link>
                    <Link style={{ textDecoration: 'none' }} mx={2} href="/profile">
                        Profile
                    </Link>
                    <Link style={{ textDecoration: 'none' }} mx={2} href="/login">
                        Login
                    </Link>
                    <Link style={{ textDecoration: 'none' }} mx={2} href="/signup">
                        Sign Up
                    </Link>
                    <Link style={{ textDecoration: 'none' }} mx={2} href="/logout">
                        Logout 
                    </Link>
                </ListItem>
            </UnorderedList>
        </Flex>
    )

};

export default NavBar;
