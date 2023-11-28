import { RESET_DETAIL } from "../constraints/walletConstraint";
import {
    WITHDRAWAL_REQUEST,
    WITHDRAWAL_SUCCESS,
    WITHDRAWAL_FAIL,
    USER_WITHDRAWAL_REQUEST,
    USER_WITHDRAWAL_SUCCESS,
    USER_WITHDRAWAL_FAIL,
    CLEAR_ERROR,
    WITHDRAWAL_ANSWER_REQUEST,
    WITHDRAWAL_ANSWER_SUCCESS,
    WITHDRAWAL_ANSWER_FAIL,
} from "../constraints/withdrawalConstrain";
import axios from "axios";

const globalLink = process.env.REACT_APP_API_URL;

// user withdrawal request::begin
export const withdrawal = (pin) => async (dispatch) => {
    try {
        dispatch({ type: USER_WITHDRAWAL_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
        };

        const res = await axios.post(`${globalLink}/api/withdrawal-wallet`, { password: pin }, config, axios.defaults.withCredentials = true);

        dispatch({ type: USER_WITHDRAWAL_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: USER_WITHDRAWAL_FAIL, payload: error.response.data.message });
    }
}
// user withdrawal request::end

// withdrawal request::begin
export const getWithdrawalRequest = () => async (dispatch) => {
    try {
        dispatch({ type: WITHDRAWAL_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
        };

        const res = await axios.get(`${globalLink}/api/get-withdrawal-requests`, config, axios.defaults.withCredentials = true);

        dispatch({ type: WITHDRAWAL_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: WITHDRAWAL_FAIL, payload: error.response.data.message });
    }
}
// withdrawal request::end

// withdrawal answer::begin
export const withdrawalAnswerRequest = (transactionId, answer) => async (dispatch) => {
    try {
        dispatch({ type: WITHDRAWAL_ANSWER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
        };

        const res = await axios.post(`${globalLink}/api/answer-withdrawal-requests`, { transactionId, answer }, config, axios.defaults.withCredentials = true);

        dispatch({ type: WITHDRAWAL_ANSWER_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: WITHDRAWAL_ANSWER_FAIL, payload: error.response.data.message });
    }
}
// withdrawal answer::end

// clear error::begin
export const resetDetails = () => async (dispatch) => {
    dispatch({ type: RESET_DETAIL });
}
// clear error::end

// clear error::begin
export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
}
// clear error::end