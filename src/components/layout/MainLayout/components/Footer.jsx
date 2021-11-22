import {
  Box,
  Flex,
  useColorModeValue,
  Container,
  Text
} from '@chakra-ui/react';

export default function Footer() {

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')}>
      <Container maxW={'6xl'}>
        <Flex h={16} alignItems={'center'}>
          <Text as="span">🎨 Art By{' '}<Text fontWeight="700" as="span">Pablo Stanley</Text></Text>
        </Flex>
      </Container>
    </Box>
  );
}