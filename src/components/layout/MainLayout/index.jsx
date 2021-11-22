import { Flex, Box } from "@chakra-ui/react";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

export default function MainLayout({ children }) {
  return (
    <Flex direction="column" minH="100vh">
      <Navigation />
      <Box flex="1">
        {children}
      </Box>
      <Footer />
    </Flex>
  )
}
