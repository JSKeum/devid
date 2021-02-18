import React from 'react';
import { useHistory } from 'react-router-dom';
import Login from '../components/Login';
import './IntroPage.css';

function IntroPage() {
    const history = useHistory();

    const goToMyCocPage = () => {
        history.push('/cocreceived');
    };
    
    return (
        <div className="intro">
            <div className="loginWrapper">
                <Login />
                <button type="button" onClick={goToMyCocPage}>받은 내용증명 확인하기</button>
            </div>
        </div>
    )
}

export default IntroPage;
