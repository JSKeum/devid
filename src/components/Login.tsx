import React, { useContext } from 'react';
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
        }
    }

    // TODO: 아이디가 있는 경우 메인페이지로 이동

    return (
        <>
            <button type="button" onClick={connectWallet}>지갑으로 시작하기</button>
            <button type="button" onClick={connectWallet}>휴대폰 번호로 시작하기</button>
        </>
    )
}

export default Login;
