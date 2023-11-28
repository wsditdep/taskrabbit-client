import {
    WITHDRAWAL_REQUEST,
    WITHDRAWAL_SUCCESS,
    WITHDRAWAL_FAIL,
    CLEAR_ERROR,
    USER_WITHDRAWAL_REQUEST,
    USER_WITHDRAWAL_SUCCESS,
    USER_WITHDRAWAL_FAIL,
    RESET_DETAIL,
    WITHDRAWAL_ANSWER_REQUEST,
    WITHDRAWAL_ANSWER_SUCCESS,
} from "../constraints/withdrawalConstrain";

export const withdrawalRequests = (state = { allWithdrawalRequest: [] }, action) => {
    switch (action.type) {
        case WITHDRAWAL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case WITHDRAWAL_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                allWithdrawalRequest: action.payload.requests
            }
        case WITHDRAWAL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const userWithdrawalReducer = (state = { userWithdrawal: {} }, action) => {
    switch (action.type) {
        case USER_WITHDRAWAL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_WITHDRAWAL_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                userWithdrawal: action.payload
            }
        case USER_WITHDRAWAL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const withdrawalAnswerReducer = (state = { withdrawalAnswer: {} }, action) => {
    switch (action.type) {
        case WITHDRAWAL_ANSWER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case WITHDRAWAL_ANSWER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                withdrawalAnswer: action.payload.editedTransaction
            }
        case USER_WITHDRAWAL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.data
            }
        case RESET_DETAIL:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

