import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fromUnixTime, formatISO} from 'date-fns'
import { DevidContext } from '../store/store';
import { abi as cocAbi } from '../customContracts/coc';
import './CocReceivedPage.scss';
import devidDocumentImage from '../assets/devid-document.png';

function CocReceivedPage() {
    const [cocAddressList, setCocAddressList] = useState<string[]>([]);
    const [cocDateList, setCocDateList] = useState<string[]>([]);
    const { state, dispatch } = useContext(DevidContext);
    const { wallet, cocContractInstance, web3 } = state;
    const history = useHistory();

    const getMyCocAddressList = async () => {
        const cocAddressList = await cocContractInstance.methods.getReceivedCOCs(wallet).call();

        console.debug('my received cocs, ', cocAddressList);
        await showCocConractInfos(cocAddressList);
    }

    const makeCocInstance = async (address: string) => await new web3.eth.Contract(cocAbi, address);

    const connectWallet = async () => {
        if (!state.wallet) {
          await window.ethereum.enable();
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          
          dispatch({ type: "SET_USER_WALLET", value: accounts[0] });
        }
    }

    const showCocConractInfos = async (cocAddressList: string[]) => {
        if (cocContractInstance && wallet && web3) {
        const cocAddresses: string[] = [];
        const cocDates: string[] = [];
            await cocAddressList.forEach(async (cocAddress) => {
                const cocInstance = await makeCocInstance(cocAddress);
                console.debug(cocInstance);
                const mockTime = formatISO(fromUnixTime(1613713827), { representation: 'date' });
                cocAddresses.push(cocAddress);
                cocDates.push(mockTime)
            })
            await setCocAddressList(cocAddresses);
            await setCocDateList(cocDates);
        }
    }
    
    useEffect(() => {
        if (!wallet) {
            connectWallet();
        }

        if (cocContractInstance && wallet) {
            getMyCocAddressList();
        }
    }, [state]);

    return (    
        <div className="myCoCPage">
            <div className="title flex-center">
                <h1>DEvid </h1>
                <img src={devidDocumentImage} alt="devid-document"/>
            </div>
            <div className="myCoC">
                <h2>내가 받은 내용증명 ({cocAddressList.length}개)</h2>
                {cocAddressList.map((coc, index) => 
                <div className="info-wrapper">
                    <Link className="link-button" to={`/cocdetail/${coc}`}
                    > 내용증명 {index}
                    </Link>
                    <div className="info">
                        <a target="_blank" rel="noopener noreferrer" href={`https://kovan.etherscan.io/address/${coc}`}>Contract <i className="fas fa-link"></i></a>
                        <span>{cocDateList[index]}</span>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default CocReceivedPage;
