import React from 'react';
import { useHistory } from 'react-router-dom';
import './MainPage.scss';
import devidDocumentImage from '../assets/devid-document.png';

function MainPage() {
    const history = useHistory();

    const goToMyCocPage = () => {
        history.push('/cocreceived');
    };

    const goToCocPage = () => {
        history.push('/cocform');
    };

    return (
        <div className="mainWrapper">
            <div className="title flex-center">
                <h1>DEvid</h1>
                <img src={devidDocumentImage} alt="devid-document"/>
            </div>
            <div className="button-wrapper">
                <button type="button" onClick={goToCocPage}>내용증명 작성하기</button>
                <button type="button" onClick={goToMyCocPage}>받은 내용증명 확인하기</button>
            </div>
        </div>
    );
}

export default MainPage;
