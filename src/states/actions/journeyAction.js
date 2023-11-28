import {
    CREATE_JOURNEY_REQUEST,
    CREATE_JOURNEY_SUCCESS,
    CREATE_JOURNEY_FAIL,
    FETCH_USER_JOURNEY_REQUEST,
    FETCH_USER_JOURNEY_SUCCESS,
    FETCH_USER_JOURNEY_FAIL,
    RESET_NEW,
    CLEAR_ERROR,
    RESET_DETAILS,
    PLACE_USER_JOURNEY_REQUEST,
    PLACE_USER_JOURNEY_SUCCESS,
    PLACE_USER_JOURNEY_FAIL,
    SUBMIT_USER_JOURNEY_SUCCESS,
    SUBMIT_USER_JOURNEY_REQUEST,
    SUBMIT_USER_JOURNEY_FAIL,
    USER_JOURNEY_BY_ID_SUCCESS,
    USER_JOURNEY_BY_ID_REQUEST,
    USER_JOURNEY_BY_ID_FAIL,
    USER_JOURNEY_HISTORY_BY_ID_REQUEST,
    USER_JOURNEY_HISTORY_BY_ID_SUCCESS,
    USER_JOURNEY_HISTORY_BY_ID_FAIL,
    GET_JOURNEY_HISTORY_REQUEST,
    GET_JOURNEY_HISTORY_SUCCESS,
    GET_JOURNEY_HISTORY_FAIL,
    CREATE_CUSTOM_JOURNEY_REQUEST,
    CREATE_CUSTOM_JOURNEY_SUCCESS,
    CREATE_CUSTOM_JOURNEY_FAIL,
    GET_ALL_CUSTOM_JOURNEY_REQUEST,
    GET_ALL_CUSTOM_JOURNEY_SUCCESS,
    GET_ALL_CUSTOM_JOURNEY_FAIL,
    RESET_JOURNEY_REQUEST,
    RESET_JOURNEY_SUCCESS,
    RESET_JOURNEY_FAIL,
    GET_CUSTOM_JOURNEY_BY_ID_REQUEST,
    GET_CUSTOM_JOURNEY_BY_ID_SUCCESS,
    GET_CUSTOM_JOURNEY_BY_ID_FAIL,
    UPDATE_CUSTOM_JOURNEY_REQUEST,
    UPDATE_CUSTOM_JOURNEY_SUCCESS,
    RESET_UPDATE,
    GET_USER_JOURNEY_BY_ID_REQUEST,
    GET_USER_JOURNEY_BY_ID_SUCCESS,
    GET_USER_JOURNEY_BY_ID_FAIL,
    UPDATE_USER_JOUNREY_REQUEST,
    UPDATE_USER_JOUNREY_SUCCESS,
    UPDATE_USER_JOUNREY_FAIL,
} from "../constraints/journeyConstraint";
import axios from "axios";

const globalLink = process.env.REACT_APP_API_URL;

// create journey::begin
export const createJourney = (userId, maxStagesNumber, breakPoints) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_JOURNEY_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.post(`${globalLink}/api/create-journey`, { userId, maxStagesNumber, breakPoints }, config, axios.defaults.withCredentials = true);

        dispatch({ type: CREATE_JOURNEY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: CREATE_JOURNEY_FAIL, payload: error.response.data.message });
    }
}
// fetch journey::end

// fetch journey::end
export const getUserJourney = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_USER_JOURNEY_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-journey`, config, axios.defaults.withCredentials = true);

        dispatch({ type: FETCH_USER_JOURNEY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: FETCH_USER_JOURNEY_FAIL, payload: error.response.data.message });
    }
}
// fetch journey::end

// place order::end
export const placeJourney = (id) => async (dispatch) => {
    try {
        dispatch({ type: PLACE_USER_JOURNEY_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.post(`${globalLink}/api/place-order`, { journeyId: id }, config, axios.defaults.withCredentials = true);

        dispatch({ type: PLACE_USER_JOURNEY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: PLACE_USER_JOURNEY_FAIL, payload: error.response.data.message });
    }
}
// place order::end

// submit order::end
export const submitJourney = () => async (dispatch) => {
    try {
        dispatch({ type: SUBMIT_USER_JOURNEY_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.post(`${globalLink}/api/submit-order`, config, axios.defaults.withCredentials = true);

        dispatch({ type: SUBMIT_USER_JOURNEY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: SUBMIT_USER_JOURNEY_FAIL, payload: error.response.data.message });
    }
}
// submit order::end

// user journey by id::end
export const getUserJourneyById = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_JOURNEY_BY_ID_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-user-by-id?id=${id}`, config, axios.defaults.withCredentials = true);

        dispatch({ type: USER_JOURNEY_BY_ID_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: USER_JOURNEY_BY_ID_FAIL, payload: error.response.data.message });
    }
}
// user journey by id::end

// user journey history::end
export const getUserAllHistory = () => async (dispatch) => {
    try {
        dispatch({ type: GET_JOURNEY_HISTORY_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-journey`, config, axios.defaults.withCredentials = true);

        dispatch({ type: GET_JOURNEY_HISTORY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_JOURNEY_HISTORY_FAIL, payload: error.response.data.message });
    }
}
// user journey history::end

// user journey history by id::end
export const getUserJourneyHistoryById = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_JOURNEY_HISTORY_BY_ID_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-journey-history?journeyId=${id}`, config, axios.defaults.withCredentials = true);

        dispatch({ type: USER_JOURNEY_HISTORY_BY_ID_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: USER_JOURNEY_HISTORY_BY_ID_FAIL, payload: error.response.data.message });
    }
}
// user journey history by id::end

// get all custom journey::begin
export const getAllCustomJourney = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_CUSTOM_JOURNEY_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-custom-journeys`, config, axios.defaults.withCredentials = true);

        dispatch({ type: GET_ALL_CUSTOM_JOURNEY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_ALL_CUSTOM_JOURNEY_FAIL, payload: error.response.data.message });
    }
}
// get all custom journey::begin

// create custom journey::begin
export const createCustomJourney = (journeyName, breakPoints, maxStagesNumber, productValPerc, pointsCommission, couponsReward) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CUSTOM_JOURNEY_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.post(`${globalLink}/api/create-custom-journey`, { journeyName, breakPoints, maxStagesNumber, productValPerc, pointsCommission, couponsReward }, config, axios.defaults.withCredentials = true);

        dispatch({ type: CREATE_CUSTOM_JOURNEY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: CREATE_CUSTOM_JOURNEY_FAIL, payload: error.response.data.message });
    }
}
// create custom journey::begin

// get custom journey by id::begin
export const getCustomJourneyById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_CUSTOM_JOURNEY_BY_ID_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-custom-journey-by-id?customJourneyId=${id}`, config, axios.defaults.withCredentials = true);

        dispatch({ type: GET_CUSTOM_JOURNEY_BY_ID_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_CUSTOM_JOURNEY_BY_ID_FAIL, payload: error.response.data.message });
    }
}
// get custom journey by id::begin

// update custom journey::begin
export const updateCustomJourney = (customJourneyId, journeyName, breakPoints, maxStagesNumber, productValPerc, pointsCommission, couponsReward) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CUSTOM_JOURNEY_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.put(`${globalLink}/api/edit-custom-journey`, { customJourneyId, journeyName, breakPoints, maxStagesNumber, productValPerc, pointsCommission, couponsReward }, config, axios.defaults.withCredentials = true);

        dispatch({ type: UPDATE_CUSTOM_JOURNEY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_CUSTOM_JOURNEY_BY_ID_FAIL, payload: error.response.data.message });
    }
}
// update custom journey::begin

// update user journey::begin
export const updateUserJourney = (journeyId, userId, breakPoints, maxStagesNumber, productValPerc, pointsCommission) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_JOUNREY_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.post(`${globalLink}/api/edit-journey`, { journeyId, userId, breakPoints, maxStagesNumber, productValPerc, pointsCommission }, config, axios.defaults.withCredentials = true);

        dispatch({ type: UPDATE_USER_JOUNREY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: UPDATE_USER_JOUNREY_FAIL, payload: error.response.data.message });
    }
}
// update user journey::begin

// reset journey::begin
export const resetJourney = (journeyId, type) => async (dispatch) => {
    console.log(type)
    try {
        dispatch({ type: RESET_JOURNEY_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        if (type === "reset") {
            var res = await axios.put(`${globalLink}/api/reset-journey`, { journeyId }, config, axios.defaults.withCredentials = true);
        } else {
            var res = await axios.put(`${globalLink}/api/cancel-journey`, { journeyId }, config, axios.defaults.withCredentials = true);
        }
        
        dispatch({ type: RESET_JOURNEY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: RESET_JOURNEY_FAIL, payload: error.response.data.message });
    }
}
// reset journey::end

// get user journey by id::begin
export const fetchUserJourneyById = (journeyId) => async (dispatch) => {
    console.log(journeyId)
    try {
        dispatch({ type: GET_USER_JOURNEY_BY_ID_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.get(`${globalLink}/api/get-journey-by-id?journeyId=${journeyId}`, config, axios.defaults.withCredentials = true);

        dispatch({ type: GET_USER_JOURNEY_BY_ID_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_USER_JOURNEY_BY_ID_FAIL, payload: error.response.data.message });
    }
}
// get user journey by id::end

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