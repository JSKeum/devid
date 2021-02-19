type ActionType = 'SET_USER_WALLET' | 'SET_COCFACTORY_CONTRACT' | 'SET_WEB3';

export interface DevidState {
  wallet: string;
  cocContractInstance: any;
  web3: any;
}

export interface Action {
  type: ActionType;
  value: string | any;
}

const reducer = (state: DevidState, action: Action) => {
  switch(action.type) {
    case 'SET_USER_WALLET':
      return {
        ...state,
        wallet: action.value
      }
    case 'SET_COCFACTORY_CONTRACT':
      return {
        ...state,
        cocContractInstance: action.value
      }
    case 'SET_WEB3':
      return {
        ...state,
        web3: action.value
      }
    default: return state;
  }
}

export default reducer;
