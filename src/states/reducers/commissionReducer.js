import {
    FETCH_COMMISSION_REQUEST,
    FETCH_COMMISSION_SUCCESS,
    FETCH_COMMISSION_FAIL,
    CLEAR_ERROR,
    RESET_NEW,
    CREATE_COMMISSION_REQUEST,
    CREATE_COMMISSION_SUCCESS,
    CREATE_COMMISSION_FAIL,
    COMMISSION_DETAIL_REQUEST,
    COMMISSION_DETAIL_SUCCESS,
    COMMISSION_DETAIL_FAIL,
    RESET_DETAILS,
    COMMISSION_UPDATE_REQUEST,
    COMMISSION_UPDATE_SUCCESS,
    COMMISSION_UPDATE_FAIL,
    RESET_UPDATE
} from "../constraints/commissionConstraint";

export const commissionsReducer = (state = { allCommissions: [] }, action) => {
    switch (action.type) {
        case FETCH_COMMISSION_REQUEST:
            return {
                loading: true,
                allCommissions: []
            }
        case FETCH_COMMISSION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                allCommissions: action.payload.commissionLevels
            }
        case FETCH_COMMISSION_FAIL:
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

export const newCommissionReducer = (state = { commission: {} }, action) => {
    switch (action.type) {
        case CREATE_COMMISSION_REQUEST:
            return {
                loading: true,
                commission: {}
            };
        case CREATE_COMMISSION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                commission: action.payload.commissionLevel
            };
        case CREATE_COMMISSION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case RESET_NEW:
            return {
                loading: false,
            };
        case CLEAR_ERROR:
            return {
                error: null
            };
        default:
            return state;
    }
}

export const commissionDetailReducer = (state = { commission: {} }, action) => {
    switch (action.type) {
        case COMMISSION_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case COMMISSION_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                commission: action.payload.commissionLevel
            };
        case COMMISSION_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case RESET_DETAILS:
            return {
                ...state,
                success: false
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

export const commissionReducer = (state = {}, action) => {
    switch (action.type) {
        case COMMISSION_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case COMMISSION_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success,
                message: action.payload.message,
            };
        case COMMISSION_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case RESET_UPDATE:
            return {
                ...state,
                isUpdated: false
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