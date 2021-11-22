import { useWeb3React } from "@web3-react/core"
import { useCallback, useEffect, useState } from "react"
import usePersonitasContract from "./usePersonitasContract"

const getData = async ({ contract, tokenId }) => {
  const [uri, dna, owner] = await Promise.all([
    contract.methods.tokenURI(tokenId).call(),
    contract.methods.tokenDNA(tokenId).call(),
    contract.methods.ownerOf(tokenId).call()
  ])

  const responseMetadata = await fetch(uri)
  const metadata = await responseMetadata.json()

  return {
    tokenId,
    uri,
    dna,
    owner,
    ...metadata
  }
}

export const useAllPersonitasData = () => {
  const [addressFilter, setAddressFilter] = useState(null)
  const [personitas, setPersonitas] = useState([])
  const [loading, setLoading] = useState(false)
  const { library } = useWeb3React()

  const personitasContract = usePersonitasContract()

  const requestPersonitas = useCallback(async () => {
    if (personitasContract) {
      try {
        setLoading(true)
        let tokenIds

        if (addressFilter) {
          const balanceOf = await personitasContract.methods.balanceOf(addressFilter).call()
          tokenIds = new Array(parseInt(balanceOf, 10)).fill().map(async (_, idx) => {
            const tokenId = await personitasContract.methods.tokenOfOwnerByIndex(addressFilter, idx).call()
            return getData({ contract: personitasContract, tokenId: tokenId })
          })
        } else {
          const totalSupply = await personitasContract.methods.totalSupply().call()
          tokenIds = new Array(parseInt(totalSupply, 10)).fill().map((_, idx) => (
            getData({ contract: personitasContract, tokenId: idx }))
          )
        }
  
        const data = await Promise.all(tokenIds)
        setPersonitas(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
  }, [personitasContract, addressFilter])

  const filterByAddress = useCallback(address => {
    if (library?.utils.isAddress(address)) {
      setAddressFilter(address)
    } else {
      setAddressFilter(null)
    }
  }, [library?.utils])

  useEffect(() => {
    requestPersonitas()
  }, [requestPersonitas])

  return { personitas, loading, disconnected: !personitasContract, requestPersonitas, filterByAddress, addressFilter }
}