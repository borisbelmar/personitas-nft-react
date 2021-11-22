import { Button } from "@chakra-ui/button"
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input"
import { Box, Flex, Link } from "@chakra-ui/layout"
import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { usePersonitasDataContext } from "../context/PersonitasDataContext"

export default function SearchBar() {
  const { search } = useLocation()
  const { library } = useWeb3React()
  const { filterByAddress, addressFilter, disconnected } = usePersonitasDataContext()
  const [address, setAddress] = useState(addressFilter)
  const [invalidAddress, setInvalidAddress] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!invalidAddress) {
      filterByAddress(address)
    }
    setSubmitted(true)
  }

  const handleChange = (e) => {
    const { value } = e.target
    if (value === '' || library?.utils?.isAddress(value)) {
      setInvalidAddress(false)
    } else {
      setInvalidAddress(true)
    }
    setAddress(value)
  }

  useEffect(() => {
    const queryAddress = new URLSearchParams(search).get('address')
    if (library?.utils?.isAddress(queryAddress) || queryAddress === '')  {
      setAddress(queryAddress)
      filterByAddress(queryAddress)
    }
  }, [search, filterByAddress, library?.utils])

  const removeFilter = () => {
    filterByAddress('')
    setAddress('')
    setInvalidAddress(false)
    setSubmitted(false)
  }

  return (
    <Box>
      <Flex as="form" onSubmit={handleSubmit} mb="2">
        <FormControl isInvalid={submitted && invalidAddress}>
          <InputGroup>
            <InputLeftElement>
              🔍
            </InputLeftElement>
            <Input
              value={address}
              onChange={handleChange}
              focusBorderColor="teal.500"
              borderEndRadius="0"
              placeholder="0x0000000000000000000000000000000000000000"
            />
            <Button disabled={(submitted && invalidAddress) || disconnected} colorScheme="teal" borderStartRadius="0" type="submit">
              Search by Wallet
            </Button>
          </InputGroup>
          <FormErrorMessage>Invalid address</FormErrorMessage>
        </FormControl>
      </Flex>
      {address && (
        <Link role="button" color="teal.500" onClick={removeFilter}>
          Remove filter
        </Link>
      )}
    </Box>
  )
}
