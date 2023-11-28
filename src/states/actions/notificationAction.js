import axios from "axios";
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

const globalLink = process.env.REACT_APP_API_URL;

// getNotification::begin
export const getNotificationByID = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_NOTIFICATION_BY_ID_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-user-parameter-by-id?parameterId=${id}`, config, axios.defaults.withCredentials = true);

        dispatch({ type: GET_NOTIFICATION_BY_ID_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_NOTIFICATION_BY_ID_FAIL, payload: error.response.data.message });
    }
}
// getNotification::end

// getNotification::begin
export const getAllNotification = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_NOTIFICATION_BY_ID_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-parameters`, config, axios.defaults.withCredentials = true);        

        dispatch({ type: GET_ALL_NOTIFICATION_BY_ID_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_ALL_NOTIFICATION_BY_ID_FAIL, payload: error.response.data.message });
    }
}
// getNotification::end

// update notification::begin
export const updateNotification = (parameterName, value) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_NOTIFICATION_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.put(`${globalLink}/api/update-parameter`, { parameterId: "6535ea9f61fc4a5231ede89e", parameterName, value }, config, axios.defaults.withCredentials = true);
        console.log(res)

        dispatch({ type: UPDATE_NOTIFICATION_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: UPDATE_NOTIFICATION_FAIL, payload: error.response });
    }
}
// update notification::end

// clear new::begin
export const resetNew = () => async (dispatch) => {
    dispatch({ type: RESET_NEW });
}
// clear new::end

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