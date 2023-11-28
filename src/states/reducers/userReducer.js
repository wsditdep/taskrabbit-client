import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERROR,
    LOAD_REQUEST,
    LOAD_SUCCESS,
    LOAD_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    RESET_NEW,
    FETCH_USER_DETAILS_REQUEST,
    FETCH_USER_DETAILS_SUCCESS,
    FETCH_USER_DETAILS_FAIL,
    CREATE_PRACTICE_ACCOUNT_REQUEST,
    CREATE_PRACTICE_ACCOUNT_SUCCESS,
    CREATE_PRACTICE_ACCOUNT_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    RESET_UPDATE,
    RESET_ACC,
    RESET_CREDENTIALS_REQUEST,
    RESET_CREDENTIALS_SUCCESS,
    RESET_CREDENTIALS_FAIL,
} from "../constraints/userConstraint";

export const userReducer = (state = {
    user: null,
    isAuthenticated: false,
}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOAD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.userData
            };
        case LOGIN_FAIL:
        case LOAD_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            }
        case LOGOUT_FAIL:
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

export const userRegisterReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                loading: true,
                isAccountCreated: false
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAccountCreated: true,
                message: action.payload.message,
                user: action.payload.user
            };
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAccountCreated: false,
                user: null,
                error: action.payload
            };
        case CLEAR_ERROR:
            return {
                error: null
            };
        case RESET_ACC:
            return {
                ...state,
                isAccountCreated: false,
            };
        default:
            return state;
    }
}

export const fetchUserReducer = (state = { allUsers: [] }, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                loading: true,
                allUsers: []
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                allUsers: action.payload
            };
        case FETCH_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERROR:
            return {
                error: null
            };
        default:
            return state;
    }
}

export const newUserReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return {
                loading: true,
                user: {}
            };
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                user: action.payload.user
            };
        case CREATE_USER_FAIL:
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

export const userDetailReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case FETCH_USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                user: action.payload.user
            };
        case FETCH_USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case RESET_NEW:
            return {
                ...state,
                user: {
                    ...state.user,
                    _id: "11111"
                },
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

export const createPracticeAccount = (state = { account: {} }, action) => {
    switch (action.type) {
        case CREATE_PRACTICE_ACCOUNT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_PRACTICE_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                account: action.payload.user
            };
        case CREATE_PRACTICE_ACCOUNT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case RESET_NEW:
            return {
                ...state,
                loading: false,
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

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success,
                message: action.payload.message,
            };
        case UPDATE_USER_FAIL:
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

export const resetCredential = (state = { credential: {} }, action) => {
    switch (action.type) {
        case RESET_CREDENTIALS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case RESET_CREDENTIALS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                credential: action.payload
            };
        case RESET_CREDENTIALS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case RESET_NEW:
            return {
                ...state,
                loading: false,
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