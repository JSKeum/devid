import React from 'react';
import './CocDetail.scss';
import devidDocumentImage from '../assets/devid-document.png';

interface CocMoneyTemplate {
    sender: string;
    senderAddress: string;
    senderPhonNumber: number;
    senderEmail: string;
    recipient: string;
    recipientAddress: number;
    recipientPhonNumber: string;
    recipientEmail: string;
    lentDate: string;
    debt: number;
    receivingDate: string;
    interest: string;
    amount: number;
    ultimatumDate: string;
    title: string;
}

interface Props {
    match: any;
}

function CocDetail(props: Props) {
    const mockDate = "2021-02-20";
    const mockCoc = {
        sender: "오백만",
        senderAddress: "대학동",
        senderPhonNumber: '01011111111',
        senderEmail: "오백만@com",
        recipient: "김파렴",
        recipientAddress: "서림동",
        recipientPhonNumber: '01022222222',
        recipientEmail: "김파렴@com",
        lentDate: "2020-10-10",
        debt: "5000000",
        receivingDate: "2021-01-01",
        interest: "10",
        amount: "1000000",
        ultimatumDate: "2020-02-21",
        title: "대여금 반환 청구(촉구)의 건",
    }

    console.log(props.match.params.address);

    return (
        <div className="cocDetailPage">
            <div className="title">
                <div className="title-and-logo">
                    <h1>Devid</h1>
                    <img src={devidDocumentImage} alt="devid-document"/>
                </div>
                <h2>디지털 내용증명서</h2>
            </div>
            <div className="cocDetail">
                <div className="sender">
                    <p><strong>발신인 :</strong> {mockCoc.sender} / {mockCoc.senderAddress} / {mockCoc.senderPhonNumber} {mockCoc.senderEmail}</p>
                </div>
                <div className="recipient">
                    <p><strong>수신인 :</strong> {mockCoc.recipient} / {mockCoc.recipientAddress} / {mockCoc.recipientPhonNumber} {mockCoc.recipientEmail}</p>
                </div>
                <div className="contents">
                    <h3>제목 : {mockCoc.title}</h3>
                    <p>1. 수신인 귀하의 건승을 기원합니다</p>
                    <p>2. 위 발신인은 {mockCoc.lentDate}에 위 수신인에게 금 {mockCoc.debt}원을, 변제기 {mockCoc.receivingDate}, 이자(연) {mockCoc.interest}로 대여하여 주었습니다.</p>
                    <p>3. 그런데 귀하는 현재 위 금원 중 {mockCoc.amount}을 갚지 않고 있습니다.</p>
                    <p>4. 수신인은 {mockCoc.ultimatumDate}까지 {mockCoc.amount}을 입금하시길 바랍니다.</p>
                    <p>5. 귀하꼐서 위 사항에 대한 이행을 하시지 않는 경우 민, 형사상의 법적 조치를 취할 수 밖에 없음을 정중하게 통지하는 바입니다.</p>
                </div>
                <div className="footer">
                    <p>{mockDate}</p>
                    <p>{mockCoc.sender}</p>
                </div>
            </div>
        </div>
    )
}

export default CocDetail;
