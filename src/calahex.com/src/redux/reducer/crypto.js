import ActionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    cryptoLists: [],
    cryptoOrderLists: {
        bids: [],
        asks: []
    },
    cryptoTradLists: [],
    cryptoExchangeDepth: {
        asks: [],
        bids: []
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.CryptoExchangePairList:
            return ({
                ...state,
                cryptoLists: action.payload,
            });
        case ActionTypes.CryptoExchangeOrderList:
            return ({
                ...state,
                cryptoOrderLists: action.payload
            });
        case ActionTypes.CryptoExchangeTradList:
            return ({
                ...state,
                cryptoTradLists: action.payload
            });
        case ActionTypes.CryptoExchangeDepth:
            return ({
                ...state,
                cryptoExchangeDepth: action.payload
            });
        default:
            return state;
    }

}
