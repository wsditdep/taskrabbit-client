import {
    FETCH_USER_WALLET_REQUEST,
    FETCH_USER_WALLET_SUCCESS,
    FETCH_USER_WALLET_FAIL,
    RESET_DETAIL,
    CLEAR_ERROR,
    FETCH_USER_WALLET_BY_ID_FAIL,
    FETCH_USER_WALLET_BY_ID_REQUEST,
    FETCH_USER_WALLET_BY_ID_SUCCESS,
    CHARGE_WALLET_REQUEST,
    CHARGE_WALLET_SUCCESS,
    CHARGE_WALLET_FAIL,
    RESET_NEW,
    SAVE_WALLET_ADDRESS_REQUEST,
    SAVE_WALLET_ADDRESS_SUCCESS,
    SAVE_WALLET_ADDRESS_FAIL,
    SAVE_WALLET_PIN_REQUEST,
    SAVE_WALLET_PIN_SUCCESS,
    SAVE_WALLET_PIN_FAIL,
    EDIT_WALLET_SUCCESS,
    EDIT_WALLET_REQUEST,
    EDIT_WALLET_FAIL,
    RESET_UPDATE,
    GET_TRANSACTION_REQUEST,
    GET_TRANSACTION_SUCCESS,
    GET_TRANSACTION_FAIL,
    GET_TRANSACTION_HISTORY_REQUEST,
    GET_TRANSACTION_HISTORY_FAIL,
    GET_TRANSACTION_HISTORY_SUCCESS
} from "../constraints/walletConstraint";
import axios from "axios";

const globalLink = process.env.REACT_APP_API_URL;

// get user wallet::begin
export const getUserWallet = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_USER_WALLET_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-user-wallet`, config, axios.defaults.withCredentials = true);

        dispatch({ type: FETCH_USER_WALLET_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: FETCH_USER_WALLET_FAIL, payload: error.response.data.message });
    }
}
// get user wallet::end

// get user wallet by id::begin
export const getUserWalletById = (id) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_USER_WALLET_BY_ID_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-wallet?userId=${id}`, config, axios.defaults.withCredentials = true);

        dispatch({ type: FETCH_USER_WALLET_BY_ID_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: FETCH_USER_WALLET_BY_ID_FAIL, payload: error.response.data.message });
    }
}
// get user wallet by id::end

// get user wallet by id::begin
export const chargeWallet = (clientId, walletId, chargeValue, processName) => async (dispatch) => {
    try {
        dispatch({ type: CHARGE_WALLET_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.post(`${globalLink}/api/charge-wallet`, { clientId, walletId, chargeValue, processName }, config, axios.defaults.withCredentials = true);

        dispatch({ type: CHARGE_WALLET_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: CHARGE_WALLET_FAIL, payload: error.response.data.message });
    }
}
// get user wallet by id::end

// save wallet address::begin
export const saveWalletAddress = (address, cardType, walletName) => async (dispatch) => {
    try {
        dispatch({ type: SAVE_WALLET_ADDRESS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.post(`${globalLink}/api/save-wallet-address`, { address, cardType, walletName }, config, axios.defaults.withCredentials = true);

        dispatch({ type: SAVE_WALLET_ADDRESS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: SAVE_WALLET_ADDRESS_FAIL, payload: error.response.data.message });
    }
}
// save wallet address::end

// save wallet pin::begin
export const saveWalletPin = (pin) => async (dispatch) => {
    try {
        dispatch({ type: SAVE_WALLET_PIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.post(`${globalLink}/api/save-withdrawal-pin`, { pin }, config, axios.defaults.withCredentials = true);

        dispatch({ type: SAVE_WALLET_PIN_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: SAVE_WALLET_PIN_FAIL, payload: error.response.data.message });
    }
}
// save wallet pin::end

// edit wallet::begin
export const editWallet = (walletId, newValue) => async (dispatch) => {
    try {
        dispatch({ type: EDIT_WALLET_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.post(`${globalLink}/api/edit-wallet`, { walletId, newValue }, config, axios.defaults.withCredentials = true);

        dispatch({ type: EDIT_WALLET_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: EDIT_WALLET_FAIL, payload: error.response.data.message });
    }
}
// edit wallet::end

// get transaction::begin
export const getTransactions = () => async (dispatch) => {
    try {
        dispatch({ type: GET_TRANSACTION_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-transactions`, config, axios.defaults.withCredentials = true);

        dispatch({ type: GET_TRANSACTION_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_TRANSACTION_FAIL, payload: error.response.data.message });
    }
}
// get transaction::end

// get transaction::begin
export const getTransactionHistory = (walletId) => async (dispatch) => {
    try {
        dispatch({ type: GET_TRANSACTION_HISTORY_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-my-transactions?walletId=${walletId}`, config, axios.defaults.withCredentials = true);

        dispatch({ type: GET_TRANSACTION_HISTORY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_TRANSACTION_HISTORY_FAIL, payload: error.response.data.message });
    }
}
// get transaction::end

// clear new::begin
export const resetNew = () => async (dispatch) => {
    dispatch({ type: RESET_NEW });
}
// clear new::end

// clear details::begin
export const resetDetails = () => async (dispatch) => {
    dispatch({ type: RESET_DETAIL });
}
// clear details::end

// clear update::begin
export const resetUpdate = () => async (dispatch) => {
    dispatch({ type: RESET_UPDATE });
}
// clear update::end

// clear error::begin
export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
}
// clear error::end