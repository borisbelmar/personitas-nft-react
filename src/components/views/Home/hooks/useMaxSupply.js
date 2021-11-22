import { useEffect, useState } from "react"
import usePersonitasContract from "../../../../hooks/usePersonitasContract"

const useMaxSupply = () => {
  const [maxSupply, setMaxSupply] = useState(0)
  const personitasNft = usePersonitasContract()

  useEffect(() => {
    if (personitasNft) {
      personitasNft.methods.maxSupply().call().then(setMaxSupply)
    }
  }, [personitasNft])

  return maxSupply
}

export default useMaxSupply
