// import { CiSquarePlus } from "react-icons/ci";

import {
    Button,
    Container,
    Flex,
    HStack,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MoonIcon, PlusSquareIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{ base: "column", small: "row" }}
            >
                <Text
                    fontSize={{ base: "22", small: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                >
                    <Link to={"/"}> ProductStore 🛒</Link>
                </Text>

                <HStack spacing={1} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <PlusSquareIcon fontSize={20} />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode == "dark" ? <SunIcon/> : <MoonIcon/>}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};
export default Navbar;
