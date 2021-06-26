import axios from "axios";
import * as config from "../../static/constants";
import ActionTypes from "./actionTypes";

export const CryptoExchangePairList = (name = "all") => async dispatch => {
    try {
        const res = await axios.post(`${config.BACKEND_URL}main/exchangeCryptoPair`, { pair_end: name });
        console.log(res, 'CryptoExchangePairList')
        dispatch({
            type: ActionTypes.CryptoExchangePairList,
            payload: res.data
        });
    } catch (err) {
        console.log(err, 'CryptoExchangePairList');
    }
}

export const CryptoExchangeOrderList = (name = "USDT_BTC") => async dispatch => {
    try {
        const res = await axios.post(`${config.BACKEND_URL}main/exchangeOrder`, { pair: name });
        console.log(res, '-------------CryptoExchangeOrderList---------')
        dispatch({
            type: ActionTypes.CryptoExchangeOrderList,
            payload: res.data
        });
    } catch (err) {
        console.log(err, 'CryptoExchangeOrderList');
    }
}

export const CryptoExchangeTradList = (name = "USDT_BTC") => async dispatch => {
    try {
        const res = await axios.post(`${config.BACKEND_URL}main/exchangeTrade`, { pair: name });
        dispatch({
            type: ActionTypes.CryptoExchangeTradList,
            payload: res.data
        });
    } catch (err) {
        console.log(err, 'CryptoExchangeTradList');
    }
}

export const CryptoExchangeDepth = (name = "USDT_BTC") => async dispatch => {
    try {
        const res = await axios.post(`${config.BACKEND_URL}main/exchangeDepthOrder`, { pair: name });
        console.log(res)
        dispatch({
            type: ActionTypes.CryptoExchangeDepth,
            payload: res.data
        });
    } catch (err) {
        console.log(err, 'CryptoExchangeDepth');
    }
}