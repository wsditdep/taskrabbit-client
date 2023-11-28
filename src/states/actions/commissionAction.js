import axios from "axios";
import {
    FETCH_COMMISSION_REQUEST,
    FETCH_COMMISSION_SUCCESS,
    FETCH_COMMISSION_FAIL,
    CREATE_COMMISSION_REQUEST,
    CREATE_COMMISSION_SUCCESS,
    CREATE_COMMISSION_FAIL,
    RESET_NEW,
    CLEAR_ERROR,
    RESET_DELETE,
    COMMISSION_DETAIL_REQUEST,
    COMMISSION_DETAIL_SUCCESS,
    COMMISSION_DETAIL_FAIL,
    COMMISSION_UPDATE_REQUEST,
    COMMISSION_UPDATE_SUCCESS,
    COMMISSION_UPDATE_FAIL,
    RESET_UPDATE,
} from "../constraints/commissionConstraint";

const globalLink = process.env.REACT_APP_API_URL;

// fetch commission::begin
export const fetchCommission = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_COMMISSION_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-commission-levels`, config, axios.defaults.withCredentials = true);

        dispatch({ type: FETCH_COMMISSION_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: FETCH_COMMISSION_FAIL, payload: error.response.data.message });
    }
}
// fetch commission::end

// create commission::begin
export const createCommission = (level, commissionValue, ticketsNumber) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_COMMISSION_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.post(`${globalLink}/api/create-commission-level`, { level, commissionValue, ticketsNumber }, config, axios.defaults.withCredentials = true);

        dispatch({ type: CREATE_COMMISSION_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: CREATE_COMMISSION_FAIL, payload: error.response.data.message });
    }
}
// create commission::end

// delete detail::begin
export const fetchCommissionDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: COMMISSION_DETAIL_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-commission-level?commissionId=${id}`, config, axios.defaults.withCredentials = true);

        dispatch({ type: COMMISSION_DETAIL_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: COMMISSION_DETAIL_FAIL, payload: error.response.data.message });
    }
}
// commission detail::end
// delete detail::begin
export const updateCommission = (commissionLevelId, level, commissionValue, ticketsNumber) => async (dispatch) => {
    try {
        dispatch({ type: COMMISSION_UPDATE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.post(`${globalLink}/api/edit-commission-level`, { commissionLevelId, commissionValue, level, ticketsNumber }, config, axios.defaults.withCredentials = true);

        dispatch({ type: COMMISSION_UPDATE_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: COMMISSION_UPDATE_FAIL, payload: error.response.data.message });
    }
}
// commission detail::end

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