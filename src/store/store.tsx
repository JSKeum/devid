import React, { createContext, Dispatch, useReducer } from 'react';
import reducer, { Action } from './reducer';
import { DevidState } from './reducer';

const initialState: DevidState = {
  wallet: "",
  cocContractInstance: null,
  web3: null,
};

type DevidDispatch = Dispatch<Action>;

export const DevidContext = createContext<{state: DevidState; dispatch: DevidDispatch}>({state: initialState, dispatch: () => null})

function Store({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DevidContext.Provider value={{state, dispatch}}> 
        {children}
    </DevidContext.Provider>
  )
}

export default Store;
