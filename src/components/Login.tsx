import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DevidContext } from '../store/store';

function Login() {
    const { dispatch, state } = useContext(DevidContext);
    const history = useHistory();
  
    const goToSignupPage = () => {
        history.push('/signup');
    };

    const connectWallet = async () => {
        if (!state.wallet) {
          await window.ethereum.enable();
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          
          dispatch({ type: "SET_USER_WALLET", value: accounts[0] });

          goToSignupPage();
        } else {
            goToSignupPage();
        }
    }
    
    return (
        <div>
            <button type="button" onClick={connectWallet}>이더리움 지갑으로 시작하기</button>
            <button type="button" onClick={connectWallet}>클레이튼 지갑으로 시작하기</button>
        </div>
    )
}

export default Login;
