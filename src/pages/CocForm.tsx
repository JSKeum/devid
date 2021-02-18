import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import IPFS from 'ipfs';
import EthCrypto from 'eth-crypto';

import { DevidContext } from '../store/store';
import './CocFormPage.scss';

function CocFormPage() {
    const { state } = useContext(DevidContext);
    const { wallet, cocContractInstance } = state;

    const [senderPhoneNumber, setSenderPhoneNumber] = useState(0);
    const handleSenderPhoneNumberChange = (event: any) => {
        setSenderPhoneNumber(event.target.value);
    }
    const [senderName, setSenderName] = useState('');
    const handleSenderNameChange = (event: any) => {
        setSenderName(event.target.value);
    }
    const [senderAddress, setSenderAddress] = useState('');
    const handleSenderAddressChange = (event: any) => {
        setSenderAddress(event.target.value);
    }
    const [senderEmail, setSenderEmail] = useState('');
    const handleSenderEmailChange = (event: any) => {
        setSenderEmail(event.target.value);
    }
    const [recipientPhoneNumber, setRecipientPhoneNumber] = useState(0);
    const handleRecipientPhoneNumberChange = (event: any) => {
        setRecipientPhoneNumber(event.target.value);
    }
    const [recipientName, setRecipientName] = useState('');
    const handleRecipientNameChange = (event: any) => {
        setRecipientName(event.target.value);
    }
    const [recipientAddress, setRecipientAddress] = useState('');
    const handleRecipientAddressChange = (event: any) => {
        setRecipientAddress(event.target.value);
    }
    const [recipientEmail, setRecipientEmail] = useState('');
    const handleRecipientEmailChange = (event: any) => {
        setRecipientEmail(event.target.value);
    }
    const [recipientPublicKey, setRecipientPublicKey] = useState('');
    const handleRecipientPublicKeyChange = (event: any) => {
        setRecipientPublicKey(event.target.value);
    }
    const [debt, setDebt] = useState(0);
    const handleDebtChange = (event: any) => {
        setDebt(event.target.value);
    }
    const [interest, setInterest] = useState(0);
    const handleInterestChange = (event: any) => {
        setInterest(event.target.value);
    }
    const [lentDate, setLentDate] = useState('');
    const handleLentDateChange = (event: any) => {
        setLentDate(event.target.value);
    }
    const [receivingDate, setReceivingDate] = useState('');
    const handleReceivingDateChange = (event: any) => {
        setReceivingDate(event.target.value);
    }
    const [amount, setAmount] = useState(0);
    const handleAmountChange = (event: any) => {
        setAmount(event.target.value);
    }
    const [ultimatumDate, setUltimatumDate] = useState('');
    const handleUltimatumDateChange = (event: any) => {
        setUltimatumDate(event.target.value);
    }
    const [otherText, setOtherText] = useState('');
    const handleOtherTextChange = (event: any) => {
        setOtherText(event.target.value);
    }

    const history = useHistory();

    const goToMyCocSendPage = () => {
        history.push('/main');
    };

    interface CocForm {
        senderPhoneNumber: number;
        senderName: string;
        senderAddress: string;
        senderEmail: string;
        recipientPhoneNumber: number;
        recipientName: string;
        recipientAddress: string;
        recipientEmail: string;
        debt: number;
        interest: number;
        lentDate: string;
        receivingDate: string;
        amount: number;
        ultimatumDate: string;
        otherText: string;
    }

    const saveToIPFS = async (data: any) => {
        const node = await IPFS.create();

        const encrypted = await EthCrypto.encryptWithPublicKey(
            recipientPublicKey, // encrypt with alice's publicKey
            JSON.stringify(data)
        );
        
        const dataToBuffer = Buffer.from(JSON.stringify(encrypted));
        const ipfs = await node.add(dataToBuffer);
        console.debug('ipfs created, ', ipfs);

        const cid = ipfs.cid.toString();
        await createCoc(cid);
    }

    const createCoc = async (cid: string) => {
        await cocContractInstance.methods.createCOC(
            '0x0493a03E62b732d4bD454ff84B00cb68013d2EcC',
            senderPhoneNumber,
            recipientAddress,
            recipientPhoneNumber,
            cid
        ).send({ from: '0x0493a03E62b732d4bD454ff84B00cb68013d2EcC' });
    }

    const onSubmit = async () => {
        const cocData: CocForm = {
            senderPhoneNumber: senderPhoneNumber,
            senderName: senderName,
            senderAddress: senderAddress,
            senderEmail: senderEmail,
            recipientPhoneNumber: recipientPhoneNumber,
            recipientName: recipientName,
            recipientAddress: recipientAddress,
            recipientEmail: recipientEmail,
            debt: debt,
            interest: interest,
            lentDate: lentDate,
            receivingDate: receivingDate,
            amount: amount,
            ultimatumDate: ultimatumDate,
            otherText: otherText,
        }

        await saveToIPFS(cocData);
        goToMyCocSendPage();
    }

    return (
        <div className="cocForm">
            <h1>대여금 반환 청구</h1>
            <div className="topInfo">
                <div className="sender-info">
                    <h2>발신인 정보</h2>
                    <div className="name-phone">
                        <h3>이름</h3>
                        <input type="text" value={senderName} onChange={handleSenderNameChange}/>
                        <h3>핸드폰</h3>
                        <input type="number" value={senderPhoneNumber} onChange={handleSenderPhoneNumberChange}/>
                    </div>
                    <div className="address">
                        <h3>주소</h3>
                        <input type="text" value={senderAddress} onChange={handleSenderAddressChange}/>
                    </div>
                    <div className="email   ">
                        <h3>이메일</h3>
                        <input type="text" value={senderEmail} onChange={handleSenderEmailChange}/>
                    </div>
                </div>
                <div className="recipient-info">
                    <h2>수신인 정보</h2>
                    <div>
                        <h3>이름</h3>
                        <input type="text" value={recipientName} onChange={handleRecipientNameChange}/>
                        <h3>핸드폰</h3>
                        <input type="number" value={recipientPhoneNumber} onChange={handleRecipientPhoneNumberChange}/>
                    </div>
                    <div>
                        <h3>주소</h3>
                        <input type="text" value={recipientAddress} onChange={handleRecipientAddressChange}/>
                    </div>
                    <div>
                        <h3>이메일</h3>
                        <input type="text" value={recipientEmail} onChange={handleRecipientEmailChange}/>
                    </div>
                    <div>
                        <h3>수신인 계정의 Public Key</h3>
                        <input type="text" value={recipientPublicKey} onChange={handleRecipientPublicKeyChange}/>
                    </div>
                </div>
            </div>
            <div className="bottomInfo">
                <div>
                    <h3>빌려준 금액(원)</h3>
                    <input type="number" value={debt} onChange={handleDebtChange}/>
                    <h3>이율(연 %)</h3>
                    <input type="string" value={interest} onChange={handleInterestChange}/>
                </div>
                <div>
                    <h3>빌려준 날짜</h3>
                    <input type="date" value={lentDate} onChange={handleLentDateChange}/>
                    <h3>받기로 한 날짜</h3>
                    <input type="date" value={receivingDate} onChange={handleReceivingDateChange}/>
                </div>
                <div>
                    <h3>청구 금액(원)</h3>
                    <input type="number" value={amount} onChange={handleAmountChange}/>
                    <h3>최종 입금 기한</h3>
                    <input type="date" value={ultimatumDate} onChange={handleUltimatumDateChange}/>
                </div>
            </div>
            <div className="bottomInfo">
                <h2>기타 전하여야 할 내용</h2>
                <textarea value={otherText} onChange={handleOtherTextChange}/>
            </div>
            <button type="button" onClick={onSubmit}>작성 완료</button>
        </div>
    );
}

export default CocFormPage;
