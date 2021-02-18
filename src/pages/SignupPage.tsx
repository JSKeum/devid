import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DevidContext } from '../store/store';
import "./SignupPage.css";

function SignupPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const { state } = useContext(DevidContext);
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
        const transaction = await onCreateUser();
        console.debug(transaction);
        goToMainPage();
    }

    return (
        <div className="signupWrapper">
            <h1>DEvid 시작하기</h1>
            <h2>휴대폰 번호를 입력해주세요!</h2>
            <p>휴대폰 번호는 해시된 값으로 지갑 주소와 결합된 데이터로 블록체인에 저장됩니다.</p>
            <input type="text" value={phoneNumber} onChange={handleNumberInputChange}/>
            <button type="button" onClick={handleSubmit}>가입하기</button>
        </div>
    )
}

export default SignupPage;
