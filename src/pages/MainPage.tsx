import React from 'react';
import { useHistory } from 'react-router-dom';

function MainPage() {
    const history = useHistory();

    const goToMyCocPage = () => {
        history.push('/mycoc');
    };

    const goToCocPage = () => {
        history.push('/cocform');
    };

    return (
        <>
            <button type="button" onClick={goToCocPage}>내용증명 작성하기</button>
            <button type="button" onClick={goToMyCocPage}>보낸 / 받은 내용증명 확인하기</button>
        </>
    );
}

export default MainPage;
