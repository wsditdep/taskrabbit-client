import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    CLEAR_ERROR,
    RESET_NEW,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    RESET_DELETE,
    DETAIL_PRODUCT_REQUEST,
    DETAIL_PRODUCT_SUCCESS,
    DETAIL_PRODUCT_FAIL,
    RESET_DETAILS,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    RESET_UPDATE,
} from "../constraints/productConstraint";

export const productsReducer = (state = { allProducts: [] }, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
            return {
                loading: true,
                allProducts: []
            }
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                allProducts: action.payload.products
            }
        case FETCH_PRODUCT_FAIL:
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

export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return {
                loading: true,
                product: {}
            };
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
                product: action.payload.product
            };
        case CREATE_PRODUCT_FAIL:
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

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success,
                message: action.payload.message,
                product: action.payload.editedProduct
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message,
            };
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case RESET_DELETE:
            return {
                ...state,
                isDeleted: false
            };
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

export const productDetailReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case DETAIL_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DETAIL_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                product: action.payload.products
            };
        case DETAIL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case RESET_DETAILS:
            return {
                ...state,
                product: {}
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