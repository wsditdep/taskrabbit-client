import axios from "axios";
import {
    LOAD_REQUEST,
    LOAD_SUCCESS,
    LOAD_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERROR,
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
    RESET_DETAIL,
    FETCH_USER_DETAILS_REQUEST,
    FETCH_USER_DETAILS_SUCCESS,
    FETCH_USER_DETAILS_FAIL,
    CREATE_PRACTICE_ACCOUNT_REQUEST,
    CREATE_PRACTICE_ACCOUNT_SUCCESS,
    CREATE_PRACTICE_ACCOUNT_FAIL,
    RESET_UPDATE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    RESET_ACC,
    RESET_CREDENTIALS_REQUEST,
    RESET_CREDENTIALS_SUCCESS,
    RESET_CREDENTIALS_FAIL

} from "../constraints/userConstraint";

const globalLink = process.env.REACT_APP_API_URL;

// loaduser::begin
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
        };

        const res = await axios.get(`${globalLink}/api/get-signin`, config, axios.defaults.withCredentials = true);

        dispatch({ type: LOAD_SUCCESS, payload: res.data });
    } catch (error) {
        // dispatch({ type: LOAD_FAIL, payload: error.response.data.message });
        dispatch({ type: LOAD_FAIL });
    }
}
// loaduser::end

// login::begin
export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
        };

        const res = await axios.post(`${globalLink}/api/signin`,
            { username, password },
            config,
            axios.defaults.withCredentials = true
        );

        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
}
// login::end

// logout::begin
export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const res = await axios.delete(`${globalLink}/api/logout`, config, axios.defaults.withCredentials = true);

        dispatch({ type: LOGOUT_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
}
// logout::end

// signup::begin
export const signUp = (phone, username, password, withdrawalPin, adminRef) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": true,
                "Access-Control-Allow-Credentials": true,
            }
        };

        const res = await axios.post(`${globalLink}/api/signup`,
            { phone, username, password, withdrawalPin, adminRef },
            config,
            axios.defaults.withCredentials = true
        );

        dispatch({ type: REGISTER_SUCCESS, payload: res.data });

    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
}
// signup::end

// fetch users::begin
export const fetchUsers = (perPage, pageNumber, sort) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
        };

        const res = await axios.get(`${globalLink}/api/get-users?pageSize=${perPage}&pageNumber=${pageNumber}&sort=${sort}`, config, axios.defaults.withCredentials = true);

        dispatch({ type: FETCH_USER_SUCCESS, payload: res.data.users });
    } catch (error) {
        dispatch({ type: FETCH_USER_FAIL, payload: error.response.data.message });
    }
}
// fetch users::end

// create users::begin
export const createUser = (
    username = "",
    email = "",
    phone = "",
    role = "",
    status = "",
    accountLevel = "",
    password = "",
    adminPasscode = ""
) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": true,
                "Access-Control-Allow-Credentials": true,
            }
        };

        if (role === "Admin") {
            const res = await axios.post(`${globalLink}/api/create-admin`,
                { username, password },
                config,
                axios.defaults.withCredentials = true
            );

            dispatch({ type: CREATE_USER_SUCCESS, payload: res.data });
        }

        if (role === "Super-Admin") {
            const res = await axios.post(`${globalLink}/api/create-super-admin`,
                { username, password, create_super_admin_key: adminPasscode },
                config,
                axios.defaults.withCredentials = true
            );

            dispatch({ type: CREATE_USER_SUCCESS, payload: res.data });
        }


    } catch (error) {
        dispatch({ type: CREATE_USER_FAIL, payload: error.response.data.message });
    }
}
// create user::end

// fetch user details::begin
export const fetchUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_USER_DETAILS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": true,
                "Access-Control-Allow-Credentials": true,
            }
        };

        const res = await axios.get(`${globalLink}/api/get-user-by-id?id=${id}`, config, axios.defaults.withCredentials = true);

        dispatch({ type: FETCH_USER_DETAILS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: FETCH_USER_DETAILS_FAIL, payload: error.response.data.message });
    }
}
// fetch user details::end

// create practice account::begin
export const createPracticeAccount = (username, mainAccount, password) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PRACTICE_ACCOUNT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
        };

        const res = await axios.post(`${globalLink}/api/create-practice-account`, { username, mainAccount, password }, config, axios.defaults.withCredentials = true);

        dispatch({ type: CREATE_PRACTICE_ACCOUNT_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: CREATE_PRACTICE_ACCOUNT_FAIL, payload: error.response.data.message });
    }
}
// create practice account::end

// update account::begin
export const updateUser = (userId, accountLevel, status, accountStatus, newPassword, withdrawalPin, walletAddress) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
        };

        const res = await axios.put(`${globalLink}/api/update-user`, { userId, accountLevel, status, accountStatus, newPassword, withdrawalPin, walletAddress }, config, axios.defaults.withCredentials = true);

        dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message });
    }
}
// update account::end

// search user::begin
export const searchUser = (val) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
        };

        const res = await axios.get(`${globalLink}/api/search-user?username=${val}`, config, axios.defaults.withCredentials = true);

        dispatch({ type: FETCH_USER_SUCCESS, payload: res.data.user });
    } catch (error) {
        dispatch({ type: FETCH_USER_FAIL, payload: error.response.data.message });
    }
}
// search user::end

// get user by role::begin
export const getUserByRole = (role) => async (dispatch) => {    
    try {
        dispatch({ type: FETCH_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
        };

        const res = await axios.get(`${globalLink}/api/get-user-by-role?role=${role}`, config, axios.defaults.withCredentials = true);

        dispatch({ type: FETCH_USER_SUCCESS, payload: res.data.users });
    } catch (error) {
        dispatch({ type: FETCH_USER_FAIL, payload: error.response.data.message });
    }
}
// get user by role::end

// reset password::begin
export const resetPassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({ type: RESET_CREDENTIALS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
        };

        const res = await axios.post(`${globalLink}/api/change-password`, { oldPassword, newPassword }, config, axios.defaults.withCredentials = true);

        dispatch({ type: RESET_CREDENTIALS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: RESET_CREDENTIALS_FAIL, payload: error.response.data.message });
    }
}
// reset password::end

// reset pin::begin
export const resetPin = (oldPin, newPin) => async (dispatch) => {
    try {
        dispatch({ type: RESET_CREDENTIALS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
        };

        const res = await axios.post(`${globalLink}/api/change-withdrawal-pin`, { oldPin, newPin }, config, axios.defaults.withCredentials = true);

        dispatch({ type: RESET_CREDENTIALS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: RESET_CREDENTIALS_FAIL, payload: error.response.data.message });
    }
}
// reset pin::end

// clear new::begin
export const resetNew = () => async (dispatch) => {
    dispatch({ type: RESET_NEW });
}
// clear new::end

// clear details::begin
export const resetDetail = () => async (dispatch) => {
    dispatch({ type: RESET_DETAIL });
}
// clear details::end

// clear details::begin
export const resetUpdate = () => async (dispatch) => {
    dispatch({ type: RESET_UPDATE });
}
// clear details::end

// clear details::begin
export const resetAcc = () => async (dispatch) => {
    dispatch({ type: RESET_ACC });
}
// clear details::end

// clear error::begin
export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
}
// clear error::end