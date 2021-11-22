import { Button, HStack } from '@chakra-ui/react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { connector } from '../../../../config/web3Conf';
import { getAddressAbbreviation } from '../../../../utils/address';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

export default function WalletButton() {
  const [balance, setBalance] = useState(0)
  const { active, activate, deactivate, account, error, library } = useWeb3React()

  const isUnsupportedChain = error instanceof UnsupportedChainIdError

  const handleConnect = useCallback(() => {
    activate(connector)
  }, [activate])

  const handleDisconnect = () => {
    deactivate()
  }

  const getBalance = useCallback(async () => {
    const accountBalance = await library.eth.getBalance(account)
    setBalance((accountBalance / 1e18).toFixed(4))
  }, [library?.eth, account])

  useEffect(() => {
    if (active) {
      getBalance()
    }
  }, [getBalance, active])

  return !active ? (
    <Button
      variant="solid"
      colorScheme="teal"
      size="sm"
      onClick={handleConnect}
      disabled={isUnsupportedChain}
    >
      {isUnsupportedChain ? 'Unsupported Chain' : 'Connect Wallet'}
    </Button>
  ) : (
    <HStack>
      <Button
        variant="ghost"
        colorScheme="teal"
        size="sm"
      >
        {balance} ETH
      </Button>
      <Button
        colorScheme="teal"
        variant="solid"
        size="sm"
        leftIcon={<FontAwesomeIcon icon={faWallet} />}
        as={Link}
        to={`/collection/?address=${account}`}
      >
        {getAddressAbbreviation(account)}
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        size="sm"
        onClick={handleDisconnect}
      >
        <FontAwesomeIcon icon={faSignOutAlt} />
      </Button>
    </HStack>
  )
}