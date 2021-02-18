import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import IPFS from 'ipfs';
import EthCrypto from 'eth-crypto';
import { DevidContext } from '../store/store';
import getWeb3 from '../utils/getWeb3';
import { abi as cocAbi } from '../customContracts/coc';
import './CocReceivedPage.css';

function CocReceivedPage() {
    const [cocAddressList, setCocAddressList] = useState<string[]>([]);
    const [web3Instance, setWeb3Instance] = useState<any>();
    const [cocInfo, setCocInfo] = useState<any>();

    const { state } = useContext(DevidContext);
    const { wallet, cocContractInstance } = state
    const history = useHistory();

    const getMyCocAddressList = async () => {
        const cocList = await cocContractInstance.methods.getReceivedCOCs('0x0493a03E62b732d4bD454ff84B00cb68013d2EcC').call();
        console.debug('my received cocs, ', cocList);

        return cocList;
        // setCocAddressList(cocList);
    }
    
    const goToMainPage = () => {
        history.push('/main');
    };

    const setWeb3 = async () => {
        try {
          const web3 = await getWeb3();
          
          setWeb3Instance(web3); 
        } catch (error) {
          alert(
            `Web3 연결에 연결에 실패했습니다 😥 나중에 에러 처리 잘 하세요!`,
          );
          console.error(error);
        }
    }
    
    const makeCocContractInstance = async (web3: any, abi: any, address: string) => {
        return await new web3.eth.Contract(abi, address);
    }

    const setMyCocList = async () => {
        const web3 = await getWeb3();

        const cocAddressList = await getMyCocAddressList();
        
        const cocInstance = await makeCocContractInstance(web3, cocAbi, cocAddressList[2]);
        
        console.log(cocInstance);
        await readReceivedCoc(cocInstance);
    }

    const readReceivedCoc = async (cocInstance: any) => {
        const cocInfo = await cocInstance.methods.read().call({ from: '0x0493a03E62b732d4bD454ff84B00cb68013d2EcC'});
        setCocInfo(cocInfo);
        console.log(cocInfo);
        console.log("위에 인포");
    }

    useEffect(() => {
        if (cocContractInstance) {
            setMyCocList();
        }
    }, [cocContractInstance]);

    // const showMyCocs = () => {
    //     cocInfo && 
    // }

    const showMyCoc = async () => {
        let pk = '';
        pk = prompt('복호화를 위해 당신의 개인키를 입력해주세요')!;

        console.log(pk);
        console.log(cocInfo);
        // IPFS decrypt
        const ipfsAddress = cocInfo._cocHash;

        // const node = await IPFS.create();

        // let dataFromIPFS = '';

        // const stream = node.cat(ipfsAddress);

        // for await (const chunk of stream) {
        //     dataFromIPFS += chunk.toString();
        // }

        // console.log(Buffer.from(dataFromIPFS));
        
        // const buffer = Buffer.from(dataFromIPFS);

        // const bufferToString = JSON.parse(buffer.toString());

        // console.log(bufferToString);

        // const decrypted = await EthCrypto.decryptWithPrivateKey(
        //     pk,
        //     bufferToString
        // );

        // console.log(decrypted);

        history.push('/cocdetail');
    }

    return (
        <div className="myCoC">
            <h1>DEvid</h1>
            <h2>내가 받은 내용증명</h2>
            <button className="myCocButton" type="button" onClick={showMyCoc}>확인하기</button>
        </div>
    )
}

export default CocReceivedPage;
