import { ChakraProvider } from "@chakra-ui/react"
import { Web3ReactProvider } from "@web3-react/core";
import { HashRouter } from "react-router-dom";
import { PersonitasDataProvider } from "./components/context/PersonitasDataContext";
import MainLayout from "./components/layout/MainLayout";
import { getLibrary } from "./config/web3Conf";
import Router from "./Router";

function App() {
  return (
    <ChakraProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <PersonitasDataProvider>
          <HashRouter>
            <MainLayout>
              <Router />
            </MainLayout>
          </HashRouter> 
        </PersonitasDataProvider>
      </Web3ReactProvider>
    </ChakraProvider>
  );
}

export default App;
