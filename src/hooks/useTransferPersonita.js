import { useState } from "react"
import { useToast } from "@chakra-ui/toast"
import { useWeb3React } from "@web3-react/core"
import usePersonitasContract from "./usePersonitasContract"
import { usePersonitasDataContext } from "../components/context/PersonitasDataContext"

const useTransferPersonita = personita => {
  const { library, active, account } = useWeb3React()
  const personitasContract = usePersonitasContract()
  const { requestPersonitas } = usePersonitasDataContext()
  const [isTransfering, setIsTransfering] = useState()
  const toast = useToast()

  const transferNft = toAddress => {
    if (active) {
      const isAddress = library.utils.isAddress(toAddress)
      if (!isAddress) {
        toast({
          title: "Invalid address",
          description: "Set a valid recipient's address",
          status: "error"
        })
        return
      }
      setIsTransfering(true)
      personitasContract.methods.safeTransferFrom(personita.owner, toAddress, personita.tokenId).send({
        from: account
      })
        .on("error", error => {
          toast({
            title: "Error",
            description: error.message,
            status: "error"
          })
          setIsTransfering(false)
        })
        .on("transactionHash", hash => {
          toast({
            title: "Transfering",
            description: `Your transaction is in progress, you can close this modal. txHash: ${hash}`,
            status: "info"
          })
        })
        .on("receipt", () => {
          toast({
            title: "Transaction complete",
            description: `The Personita has been sent to ${toAddress}`,
            status: "success"
          })
          setIsTransfering(false)
          requestPersonitas()
        })
    }
  }

  return { transferNft, isTransfering }
}

export default useTransferPersonita
