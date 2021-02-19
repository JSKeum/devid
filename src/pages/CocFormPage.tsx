import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import IPFS from 'ipfs';

import { DevidContext } from '../store/store';
import './CocFormPage.scss';
import cocLeftImage from '../assets/coc-left.png';
import devidDocumentImage from '../assets/devid-document.png';

function CocFormPage() {
    const { state, dispatch } = useContext(DevidContext);
    const { wallet, cocContractInstance } = state;
    const history = useHistory();

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
    const [recipientWallet, setRecipientWallet] = useState('');
    const handleRecipientWalletChange = (event: any) => {
        setRecipientWallet(event.target.value);
    }
    const [debt, setDebt] = useState(0);
    const handleDebtChange = (event: any) => {
        setDebt(event.target.value);
    }
    const [interest, setInterest] = useState(0);
    const handleInterestChange = (event: any) => {
        setInterest(event.target.value);
    }
    const [lentDate, setLentDate] = useState('2021-02-18');
    const handleLentDateChange = (event: any) => {
        setLentDate(event.target.value);
    }
    const [receivingDate, setReceivingDate] = useState('2021-02-18');
    const handleReceivingDateChange = (event: any) => {
        setReceivingDate(event.target.value);
    }
    const [amount, setAmount] = useState(0);
    const handleAmountChange = (event: any) => {
        setAmount(event.target.value);
    }
    const [ultimatumDate, setUltimatumDate] = useState('2021-02-18');
    const handleUltimatumDateChange = (event: any) => {
        setUltimatumDate(event.target.value);
    }
    const [otherText, setOtherText] = useState('');
    const handleOtherTextChange = (event: any) => {
        setOtherText(event.target.value);
    }

    const goToMyCocSendPage = () => {
        history.push('/main');
    };

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

    interface CocForm {
        senderPhoneNumber: number;
        senderName: string;
        senderAddress: string;
        senderEmail: string;
        recipientPhoneNumber: number;
        recipientName: string;
        recipientAddress: string;
        recipientEmail: string;
        recipientWallet: string;
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

        // const encrypted = await EthCrypto.encryptWithPublicKey(
        //     recipientPublicKey, // encrypt with alice's publicKey
        //     JSON.stringify(data)
        // );
        
        const dataToBuffer = Buffer.from(JSON.stringify(data));
        const ipfs = await node.add(dataToBuffer);
        console.debug('ipfs created, ', ipfs);

        const cid = ipfs.cid.toString();
        await createCoc(cid);
    }

    const createCoc = async (cid: string) => {
        await cocContractInstance.methods.createCOC(
            wallet,
            senderPhoneNumber,
            recipientWallet,
            recipientPhoneNumber,
            cid
        ).send({ from: wallet });

        history.push('/main');
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
            recipientWallet: recipientWallet,
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
        <div className="coc-page">
            <div className="coc-left">
                <img src={cocLeftImage} alt="coc-left"/>
            </div>
            <div className="coc-right">
                <div className="flex flex-center">
                    <h1>대여금 반환 청구</h1>
                    <img src={devidDocumentImage} alt="devid-document"/>
                </div>
                <div className="topInfo">
                    <div className="sender-info">
                        <h2>발신인 정보</h2>
                        <div className="name-phone flex">
                            <div className="name">
                                <h3>이름</h3>
                                <input type="text" value={senderName} onChange={handleSenderNameChange}/>
                            </div>
                            <div className="phone">
                                <h3>핸드폰</h3>
                                <input type="number" value={senderPhoneNumber} onChange={handleSenderPhoneNumberChange}/>
                            </div>
                        </div>
                        <div className="address">
                            <h3>주소</h3>
                            <input type="text" value={senderAddress} onChange={handleSenderAddressChange}/>
                        </div>
                        <div className="email">
                            <h3>이메일</h3>
                            <input type="text" value={senderEmail} onChange={handleSenderEmailChange}/>
                        </div>
                    </div>
                    <div className="recipient-info">
                        <h2>수신인 정보</h2>
                        <div className="name-phone flex">
                            <div className="name">
                                <h3>이름</h3>
                                <input type="text" value={recipientName} onChange={handleRecipientNameChange}/>
                            </div>
                            <div className="phone">
                                <h3>핸드폰</h3>
                                <input type="number" value={recipientPhoneNumber} onChange={handleRecipientPhoneNumberChange}/>
                            </div>
                        </div>
                        <div className="address">
                            <h3>주소</h3>
                            <input type="text" value={recipientAddress} onChange={handleRecipientAddressChange}/>
                        </div>
                        <div className="email">
                            <h3>이메일</h3>
                            <input type="text" value={recipientEmail} onChange={handleRecipientEmailChange}/>
                        </div>
                        <div className="email">
                            <h3>지갑 주소</h3>
                            <input type="text" value={recipientWallet} onChange={handleRecipientWalletChange}/>
                        </div>
                    </div>
                </div>
                <div className="bottomInfo">
                    <div className="flex">
                        <h3>빌려준 금액(원)</h3>
                        <input type="number" value={debt} onChange={handleDebtChange}/>
                        <h3>이율(연 %)</h3>
                        <input type="string" value={interest} onChange={handleInterestChange}/>
                    </div>
                    <div className="flex">
                        <h3>빌려준 날짜</h3>
                        <input className="date-input" type="date" value={lentDate} onChange={handleLentDateChange}/>
                        <h3>받기로 한 날짜</h3>
                        <input className="date-input" type="date" value={receivingDate} onChange={handleReceivingDateChange}/>
                    </div>
                    <div className="flex">
                        <h3>청구 금액(원)</h3>
                        <input className="date-input" type="number" value={amount} onChange={handleAmountChange}/>
                        <h3>최종 입금 기한</h3>
                        <input className="date-input" type="date" value={ultimatumDate} onChange={handleUltimatumDateChange}/>
                    </div>
                </div>
                <div className="bottomInfo">
                    <h2>기타 전하여야 할 내용</h2>
                    <textarea value={otherText} onChange={handleOtherTextChange}/>
                </div>
                <button className="submit" type="button" onClick={onSubmit}>작성 완료</button>
            </div>
        </div>
    );
}

export default CocFormPage;
