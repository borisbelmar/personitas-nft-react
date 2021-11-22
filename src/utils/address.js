export const getAddressAbbreviation = address => {
  const start = address.substr(0, 5);
  const end = address.substr(-4);
  return `${start}...${end}`
}