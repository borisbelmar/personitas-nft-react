import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Image } from "@chakra-ui/image";
import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { faDna, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { getAddressAbbreviation } from "../../utils/address";
import TransferPersonitaModal from "./TransferPersonitaModal";

export default function PersonitaCard ({ personita }) {
  const [openModal, setOpenModal] = useState(false)
  const { account } = useWeb3React()

  const isOwner = personita.owner === account

  const handleModalOpen = () => {
    setOpenModal(true)
  }

  const handleModalClose = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    return () => {
      handleModalClose()
    }
  }, [account])

  return (
    <>
      <Box
        role={"group"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"md"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        overflow={"hidden"}
      >
        <Box
          pos={"relative"}
          height={"260px"}
          bgColor="teal.50"        
        >
          <Image
            width="full"
            height="full"
            objectFit={"cover"}
            src={personita.image}
          />
        </Box>
        <Stack py={4} px={4} spacing="2" textAlign="center">
          <Heading fontSize={"lg"} fontWeight={700} color="teal.700">
            {personita.name}
          </Heading>
          <Tooltip hasArrow textAlign="center" label={personita.dna} bg="purple.500">
            <Text fontSize="xs" bgColor="purple.100" py={1} px={2} borderRadius="md">
              <FontAwesomeIcon icon={faDna} /><Text as="span" ml="2">{personita.dna.substring(0,10)}</Text>
            </Text>
          </Tooltip>
          <Tooltip hasArrow textAlign="center" label={personita.owner} bg="teal.500">
            <Text fontSize="xs" bgColor="teal.100" py={1} px={2} borderRadius="md">
              <FontAwesomeIcon icon={faWallet} /><Text as="span" ml="2">{getAddressAbbreviation(personita.owner)}</Text>
            </Text>
          </Tooltip>
          <Button size="sm" w="full" colorScheme="teal" disabled={!isOwner} onClick={handleModalOpen}>
            {isOwner ? 'Transfer' : 'Cant transfer'}
          </Button>
        </Stack>
      </Box>
      <TransferPersonitaModal personita={personita} isOpen={openModal} onClose={handleModalClose} />
    </>
  )
}