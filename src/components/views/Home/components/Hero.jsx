import { Button } from "@chakra-ui/button"
import { Box, Heading, HStack, Text } from "@chakra-ui/layout"
import { Link } from "react-router-dom"
import usePersonitasContract from "../../../../hooks/usePersonitasContract"
import useMaxSupply from "../hooks/useMaxSupply"
import useMint from "../hooks/useMint"

export default function Hero() {
  const maxSupply = useMaxSupply()
  const personitasNft = usePersonitasContract()
  const { mint, isMinting } = useMint()

  return (
    <Box
      as={Box}
      textAlign="left"
      spacing={{ base: 8, md: 8 }}
      py={{ base: 16, md: 40 }}>
      <Heading
        fontWeight={700}
        fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
        color="gray.600"
        lineHeight="110%"
        mb={{ base: 4, md: 8 }}
      >
        Unique NFTs, <br />unique{' '}
        <Text as="span" color="teal.500">
          Personitas
        </Text>
      </Heading>
      <Text color="gray.500" mb={2}>
        Personitas is a collection of randomly created NFTs, generating unique combinations for you. Each Personita is stored in-chain, so you can access it at any time or place. 
      </Text>
      <Text color="teal.400">
        Mint your Personita now and share it with the great Personita's community around the world! Just {maxSupply} Personitas are available.
      </Text>
      <HStack mt="6">
        <Button
          variant="solid"
          colorScheme="teal"
          disabled={!personitasNft}
          onClick={mint}
          isLoading={isMinting}
        >
          Mint your Personita
        </Button>
        <Button
          as={Link}
          variant="outline"
          colorScheme="teal"
          to="/collection"
        >
          View the full collection
        </Button>
      </HStack>
    </Box>
  )
}