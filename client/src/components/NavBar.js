import React from "react";
import { Box, Flex, VStack, HStack, UnorderedList, ListItem, Link, Image } from "@chakra-ui/react";


const NavBar = () => {

    return (
        <Flex
            bg='white'
            w={"full"}
            justifyContent='space-between'
            pos='fixed'
            zIndex={1}
            boxShadow='base'
            p={2}
        >
            <Box alignSelf='center'>
                <Image
                    src="/images/DALL·E_icon_placeholder1.png"
                    alt="yacht icon"
                    w={12}
                    borderRadius={24}
                />
            </Box>

            <Flex flexDirection='column' justifyContent='flex-end'>
        
                <UnorderedList styleType='none' display='flex' mb={2}>
                    <ListItem>
                        <Link style={{ textDecoration: 'none' }} mr={3} _hover={{ fontWeight: 'semibold', color: 'secondary.700' }} href="/login" >
                            Login/Signup
                        </Link>
                    </ListItem>
                    <ListItem>
                    </ListItem>
                    <ListItem>
                        <Link style={{ textDecoration: 'none' }} mr={4} _hover={{ fontWeight: 'semibold', color: 'secondary.700' }}  href="/logout">
                            Logout
                        </Link>
                    </ListItem>
                </UnorderedList>

                
                <UnorderedList styleType={"none"} display='flex' justifyContent='flex-end'>
                    <ListItem>
                        <Link style={{ textDecoration: 'none' }} fontSize='xl' mr={2} py={1} px={2} borderRadius='md' _hover={{ background: 'secondary.100', fontWeight: 'semibold' }} href="/home">
                            Home
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link style={{ textDecoration: 'none' }} fontSize='xl' mr={2} py={1} px={2} borderRadius='md' _hover={{ background: 'secondary.100', fontWeight: 'semibold' }} href="/profile">
                            Profile
                        </Link>
                    </ListItem>
                </UnorderedList>
            </Flex>

        </Flex>
    )

};

export default NavBar;
