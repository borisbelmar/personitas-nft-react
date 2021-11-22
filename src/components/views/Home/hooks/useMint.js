import { useToast } from "@chakra-ui/toast"
import { useWeb3React } from "@web3-react/core"
import { useState } from "react"
import usePersonitasContract from "../../../../hooks/usePersonitasContract"

const useMint = () => {
  const { account } = useWeb3React()
  const personitasNft = usePersonitasContract()
  const toast = useToast()
  const [isMinting, setIsMinting] = useState(false)

  const mint = async () => {
    if (personitasNft) {
      setIsMinting(true)
      const mintingPrice = await personitasNft.methods.mintingPrice().call()
      personitasNft.methods.mint().send({ from: account, value: mintingPrice })
        .on('transactionHash', txHash => {
          toast({
            title: "Minting",
            description: `Minting transaction is being processed on ${txHash}`,
            status: "info"
          })
        })
        .on('receipt', () => {
          setIsMinting(false)
          toast({
            title: "Confirmed Transaction",
            description: "Your personita is minted!",
            status: "success"
          })
        })
        .on('error', error => {
          setIsMinting(false)
          toast({
            title: "Error in transaction",
            description: `There was an error in your transaction: ${error.message}`,
            status: "error"
          })
        })
    }
  }

  return { mint, isMinting }
}

export default useMint
