import React, { useEffect, useContext } from "react";
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import getWeb3 from "./utils/getWeb3";
import { abi as cocFactoryContractAbi, address as cocFactoryContractAddress } from './customContracts/cocFactory';
import "./App.css";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { DevidContext } from "./store/store";

function App() {
  const { dispatch } = useContext(DevidContext);

  const setWeb3 = async () => {
    try {
      const web3 = await getWeb3();
      
      const cocContractInstance = await makeCocContractInstance(web3, cocFactoryContractAbi, cocFactoryContractAddress );
  
      dispatch({ type: "SET_COCFACTORY_CONTRACT", value: cocContractInstance });

    } catch (error) {
      alert(
        `Web3 연결에 연결에 실패했습니다 😥 나중에 에러 처리 잘 하세요!`,
      );
      console.error(error);
    }
  }

  const makeCocContractInstance = async (web3: any, abi: any, address: string) => {
    return await new web3.eth.Contract(abi, address);
  }

  useEffect(() => {
    setWeb3();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/main" component={MainPage} />
          <Route exact path="/login" component={LoginPage} />
          <Redirect exact to="/main" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
