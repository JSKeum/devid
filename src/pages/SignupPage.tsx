import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DevidContext } from '../store/store';
import "./SignupPage.scss";
import devidDocumentImage from '../assets/devid-document.png';
import spinnerGif from '../assets/devid-spinner.gif';

function SignupPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isDoingTransaction, setIsDoingTransaction] = useState(false);
    const { state, dispatch } = useContext(DevidContext);
    const { wallet, cocContractInstance } = state
    const history = useHistory();

    const onCreateUser = async () => await cocContractInstance.methods.addCOCUser(
            wallet,
            phoneNumber
        ).send({ from: wallet });
  
    const goToMainPage = () => {
        history.push('/main');
    };

    const handleNumberInputChange = (event: any) => {
        setPhoneNumber(event.target.value);
    }

    const handleSubmit = async () => {
        try { 
            setIsDoingTransaction(true);
            const transaction = await onCreateUser();
            setIsDoingTransaction(false);

            console.debug(transaction);
            goToMainPage();
        } catch(e) {
            setIsDoingTransaction(false);
            window.alert('블록체인 네트워크 연결에 문제가 발생했습니다. 다시 시도해주세요')
            console.debug(e);
        }
    }

    const connectWallet = async () => {
        if (!state.wallet) {
          await window.ethereum.enable();
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });

          dispatch({ type: "SET_USER_WALLET", value: accounts[0] });
        }
    }

    useEffect(() => {
        connectWallet();
    }, []);

    return (
        <div className="signupWrapper">
            <div className="title flex-center">
                <h1>DEvid 시작하기</h1>
                <img src={devidDocumentImage} alt="devid-document"/>
            </div>
            <div className="signup">
                <h2>휴대폰 번호를 입력해주세요!</h2>
                <p>휴대폰 번호는 해시된 값으로 지갑 주소와 결합된 데이터로 블록체인에 저장됩니다.</p>
                <div className="input-wrapper">
                    <input type="text" value={phoneNumber} onChange={handleNumberInputChange}/>
                    <button type="button" onClick={handleSubmit}>가입하기</button>
                </div>

                {isDoingTransaction && <img src={spinnerGif} className="spinner" alt="spinner" width="60px" />}
            </div>
        </div>
    )
}

export default SignupPage;
