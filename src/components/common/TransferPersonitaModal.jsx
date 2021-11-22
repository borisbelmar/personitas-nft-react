import { Button } from "@chakra-ui/button";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useState } from "react";
import useTransferPersonita from "../../hooks/useTransferPersonita";

export default function TransferPersonitaModal({
  isOpen,
  onClose,
  personita
}) {
  const { transferNft, isTransfering } = useTransferPersonita(personita)
  const [toAddress, setToAddress] = useState('')

  const handleAddressChange = (e) => {
    setToAddress(e.target.value)
  }

  const handleTransfer = () => {
    transferNft(toAddress)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transfering {personita.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            p={8}
            width="full"
            height="260px"
            src={personita.image}
          />
          <Stack>
            <FormControl isReadOnly>
              <FormLabel>From</FormLabel>
              <Input value={personita.owner} />
            </FormControl>
            <FormControl id="first-name" isRequired>
              <FormLabel>To</FormLabel>
              <Input placeholder="0x0000000000000000000" value={toAddress} onChange={handleAddressChange} />
              <FormHelperText>Must be a valid address</FormHelperText>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button isLoading={isTransfering} w="full" colorScheme="teal" onClick={handleTransfer}>
            Transfer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}