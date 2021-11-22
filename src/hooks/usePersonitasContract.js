import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import artifact from '../config/PersonitasNftArtifact'


const usePersonitasContract = () => {
  const { active, library, chainId } = useWeb3React()

  const personitasNft = useMemo(() => {
    if (active && library) {
      return new library.eth.Contract(
        artifact.abi,
        artifact.address[chainId]
      )
    }
  }, [library, chainId, active])

  return personitasNft
}

export default usePersonitasContract;
