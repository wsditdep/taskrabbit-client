import {
    CLEAR_ERROR, 
    GET_ALL_NOTIFICATION_BY_ID_FAIL, 
    GET_ALL_NOTIFICATION_BY_ID_REQUEST, 
    GET_ALL_NOTIFICATION_BY_ID_SUCCESS, 
    GET_NOTIFICATION_BY_ID_FAIL, 
    GET_NOTIFICATION_BY_ID_REQUEST, 
    GET_NOTIFICATION_BY_ID_SUCCESS, 
    RESET_DETAILS, 
    RESET_NEW, 
    RESET_UPDATE,
    UPDATE_NOTIFICATION_FAIL,
    UPDATE_NOTIFICATION_REQUEST,
    UPDATE_NOTIFICATION_SUCCESS,
} from "../../states/constraints/notificationConstraints";
import { GET_ALL_CUSTOM_JOURNEY_FAIL, GET_ALL_CUSTOM_JOURNEY_REQUEST, GET_ALL_CUSTOM_JOURNEY_SUCCESS } from "../constraints/journeyConstraint";

export const notificationReducer = (state = { notification: {} }, action) => {
    switch (action.type) {
        case GET_NOTIFICATION_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_NOTIFICATION_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                notification: action.payload.parameter
            };
        case GET_NOTIFICATION_BY_ID_FAIL:
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

export const allNotificationReducer = (state = { notifications: [] }, action) => {
    switch (action.type) {
        case GET_ALL_NOTIFICATION_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_NOTIFICATION_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.meesage,
                notifications: action.payload.parameter
            };
        case GET_ALL_NOTIFICATION_BY_ID_FAIL:
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

export const notificationsreducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success,
                message: action.payload.message,
            };
        case UPDATE_NOTIFICATION_FAIL:
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