import { createContext, useContext } from "react"
import { useAllPersonitasData } from "../../hooks/usePersonitasData"

const PersonitasDataContext = createContext({
  personitas: [],
  loading: false,
  disconnected: true,
  requestPersonitas: () => {},
  filterByAddress: () => {},
  addressFilter: ''
})

export const PersonitasDataProvider = ({ children }) => {
  const values = useAllPersonitasData()

  return (
    <PersonitasDataContext.Provider value={values}>
      {children}
    </PersonitasDataContext.Provider>
  )
}


export const usePersonitasDataContext = () => useContext(PersonitasDataContext)
