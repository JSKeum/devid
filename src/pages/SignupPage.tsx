import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DevidContext } from '../store/store';

function SignupPage() {
    const [phoneNumber, setPhoneNumber] = useState(0);
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
        <>
            <input type="number" value={phoneNumber} onChange={handleNumberInputChange}/>
            <button type="button" onClick={handleSubmit} >가입하기</button>
        </>
    )
}

export default SignupPage;
