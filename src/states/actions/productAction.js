import axios from "axios";
import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DETAIL_PRODUCT_REQUEST,
    DETAIL_PRODUCT_FAIL,
    DETAIL_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    RESET_NEW,
    RESET_DETAILS,
    RESET_DELETE,
    RESET_UPDATE,
    CLEAR_ERROR,
} from "../constraints/productConstraint";

const globalLink = process.env.REACT_APP_API_URL;

// fetch products::begin
export const fetchProducts = (pageSize = 10, pageNumber = 1) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PRODUCT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-products?pageSize=${pageSize}&pageNumber=${pageNumber}`, config, axios.defaults.withCredentials = true);

        dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCT_FAIL, payload: error.response.data.message });
    }
}
// fetch products::end

// create products::begin
export const createProduct = (data) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PRODUCT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        };

        const res = await axios.post(`${globalLink}/api/create-product`, data, config, axios.defaults.withCredentials = true);

        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAIL, payload: error.response.data.message });
    }
}
// fetch products::end

// delete product::begin
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.delete(`${globalLink}/api/delete-product?productId=${id}`, config, axios.defaults.withCredentials = true);
        console.log(res)
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.response.data.message });
    }
}
// delete product::end

// product details::begin
export const fetchProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: DETAIL_PRODUCT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-product?productId=${id}`, config, axios.defaults.withCredentials = true);

        dispatch({ type: DETAIL_PRODUCT_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: DETAIL_PRODUCT_FAIL, payload: error.response.data.message });
    }
}
// product details::end

// product update::begin
export const updateProduct = (data) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        };

        const res = await axios.post(`${globalLink}/api/edit-product`, data, config, axios.defaults.withCredentials = true);

        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.response.data.message });
    }
}
// product update::end

// clear new::begin
export const resetNew = () => async (dispatch) => {
    dispatch({ type: RESET_NEW });
}
// clear new::end

// clear delete::begin
export const resetDelete = () => async (dispatch) => {
    dispatch({ type: RESET_DELETE });
}
// clear delete::end

// clear details::begin
export const resetDetails = () => async (dispatch) => {
    dispatch({ type: RESET_DETAILS });
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