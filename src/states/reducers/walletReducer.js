import { RESET_UPDATE } from "../constraints/userConstraint";
import {
    FETCH_USER_WALLET_REQUEST,
    FETCH_USER_WALLET_SUCCESS,
    FETCH_USER_WALLET_FAIL,
    FETCH_USER_WALLET_BY_ID_REQUEST,
    FETCH_USER_WALLET_BY_ID_SUCCESS,
    FETCH_USER_WALLET_BY_ID_FAIL,
    RESET_DETAIL,
    CLEAR_ERROR,
    CHARGE_WALLET_REQUEST,
    CHARGE_WALLET_SUCCESS,
    RESET_NEW,
    CHARGE_WALLET_FAIL,
    SAVE_WALLET_ADDRESS_REQUEST,
    SAVE_WALLET_ADDRESS_SUCCESS,
    SAVE_WALLET_ADDRESS_FAIL,
    SAVE_WALLET_PIN_REQUEST,
    SAVE_WALLET_PIN_SUCCESS,
    SAVE_WALLET_PIN_FAIL,
    EDIT_WALLET_REQUEST,
    EDIT_WALLET_SUCCESS,
    EDIT_WALLET_FAIL,
    GET_TRANSACTION_REQUEST,
    GET_TRANSACTION_SUCCESS,
    GET_TRANSACTION_FAIL,
    GET_TRANSACTION_HISTORY_REQUEST,
    GET_TRANSACTION_HISTORY_SUCCESS,
    GET_TRANSACTION_HISTORY_FAIL
} from "../constraints/walletConstraint";

export const userWalletReducer = (state = { userWallet: {} }, action) => {
    switch (action.type) {
        case FETCH_USER_WALLET_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USER_WALLET_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                success: action.payload.success,
                userWallet: action.payload.wallet
            };
        case FETCH_USER_WALLET_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case RESET_DETAIL:
            return {
                ...state,
                userWallet: {}
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const userTransactionHistory = (state = { transactionHistory: [] }, action) => {
    switch (action.type) {
        case GET_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_TRANSACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                transactionHistory: action.payload.transactions
            };
        case GET_TRANSACTION_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const getUserTransactionHistoryReducer = (state = { transactionHistory: [] }, action) => {
    switch (action.type) {
        case GET_TRANSACTION_HISTORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_TRANSACTION_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                transactionHistory: action.payload.transactions
            };
        case GET_TRANSACTION_HISTORY_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const userWalletByIdReducer = (state = { userWallet: {} }, action) => {
    switch (action.type) {
        case FETCH_USER_WALLET_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USER_WALLET_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                userWallet: action.payload.wallet
            };
        case FETCH_USER_WALLET_BY_ID_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case RESET_DETAIL:
            return {
                ...state,
                userWallet: {}
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const chargeWallet = (state = { chargedWallet: {} }, action) => {
    switch (action.type) {
        case CHARGE_WALLET_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CHARGE_WALLET_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                chargedWallet: action.payload.wallet
            };
        case CHARGE_WALLET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case RESET_NEW:
            return {
                ...state,
                success: false
            };
        case CLEAR_ERROR:
            return {
                error: null
            };
        default:
            return state;
    }
}

export const saveWalletAddress = (state = { saveWalletAddress: {} }, action) => {
    switch (action.type) {
        case SAVE_WALLET_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SAVE_WALLET_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                saveWalletAddress: action.payload
            };
        case SAVE_WALLET_ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case RESET_NEW:
            return {
                ...state,
                success: false
            };
        case CLEAR_ERROR:
            return {
                error: null
            };
        default:
            return state;
    }
}

export const saveWalletPin = (state = { saveWalletPin: {} }, action) => {
    switch (action.type) {
        case SAVE_WALLET_PIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SAVE_WALLET_PIN_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                saveWalletPin: action.payload
            };
        case SAVE_WALLET_PIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case RESET_NEW:
            return {
                ...state,
                success: false
            };
        case CLEAR_ERROR:
            return {
                error: null
            };
        default:
            return state;
    }
}

export const walletAmount = (state = {}, action) => {
    switch (action.type) {
        // case DELETE_PRODUCT_REQUEST:
        case EDIT_WALLET_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case EDIT_WALLET_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success,
                message: action.payload.message,
            };
        // case DELETE_PRODUCT_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         isDeleted: action.payload.success,
        //         message: action.payload.message,
        //     };
        // case DELETE_PRODUCT_FAIL:
        case EDIT_WALLET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        // case RESET_DELETE:
        //     return {
        //         ...state,
        //         isDeleted: false
        //     };
        case RESET_UPDATE:
            return {
                ...state,
                isUpdated: false,
            };
        case CLEAR_ERROR:
            return {
                error: null
            };
        default:
            return state;
    }
}