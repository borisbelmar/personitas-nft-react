import { Center, Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

export default function Loading () {
  return (
    <Flex alignItems="center" justifyContent="center" w="full">
      <Center my="20">
        <Spinner color="teal" />
      </Center>
    </Flex>
  )
}