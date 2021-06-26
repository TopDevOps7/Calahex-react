import authReducer from './auth';
import tokenReducer from './token';
import cryptoReducer from "./crypto";
import {combineReducers} from 'redux';

export default combineReducers({
    auth: authReducer,
    token: tokenReducer,
    crypto: cryptoReducer,
});

