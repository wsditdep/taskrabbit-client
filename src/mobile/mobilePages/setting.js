import { useEffect, useState } from "react";
import logo from "../../assets/images/redzy/taskrabbit_logo.png"
import BottomNav from "../mobileComponents/BottomNav";
import MobileBreadcrumb from "../mobileComponents/MobileBreadcrumb";
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { clearError, logout, resetNew, resetPassword, resetPin } from "../../states/actions/userAction";

const UserSetting = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success, message } = useSelector(state => state.resetCredential);
    const { loading: pinLoading, error: pinError, success: pinSuccess, message: pinMessage } = useSelector(state => state.resetCredential);

    const [selectedOption, setSelectedOption] = useState('Option 1');

    const [passwordVal, setPasswordVal] = useState({
        oldPass: "",
        newPass: "",
        cpass: ""
    });

    const onChangeHandler = (e) => {
        setPasswordVal({ ...passwordVal, [e.target.name]: e.target.value });
    }

    const [pin, setPinVal] = useState({
        oldPin: "",
        newPin: "",
        cpin: ""
    });

    const onChangeHandlerAlt = (e) => {
        setPinVal({ ...pin, [e.target.name]: e.target.value });
    }

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const changePassHandler = () => {
        if (!passwordVal.oldPass) {
            return alert.error("Please enter your old password!");
        }
        if (!passwordVal.newPass) {
            return alert.error("Please enter your new password!");
        }
        if (!passwordVal.cpass) {
            return alert.error("Please confirm your password");
        }

        if (passwordVal.newPass !== passwordVal.cpass) {
            return alert.error("Password not matched!");
        }

        dispatch(resetPassword(passwordVal.oldPass, passwordVal.newPass));

    }

    const changePinHandler = () => {
        if (!pin.oldPin) {
            return alert.error("Please enter your old PIN!");
        }
        if (!pin.newPin) {
            return alert.error("Please enter your new PIN!");
        }
        if (!pin.cpin) {
            return alert.error("Please confirm your PIN");
        }

        if (pin.newPin !== pin.cpin) {
            return alert.error("PIN not matched!");
        }

        dispatch(resetPin(pin.oldPin, pin.newPin));

    }

    useEffect(() => {
        if (selectedOption === "Option 1") {
            if (error) {
                alert.error(error);
                dispatch(clearError());
            }

            if (success) {
                alert.success(message);
                dispatch(resetNew());
                dispatch(logout());
            }
        }

        if (selectedOption === "Option 2") {
            if (pinError) {
                alert.error(pinError);
                dispatch(clearError());
            }

            if (pinSuccess) {
                alert.success(pinMessage);
                dispatch(resetNew());
            }
        }

    }, [
        dispatch,
        error,
        success,
        alert,
        message,
        pinError,
        pinSuccess,
        pinMessage,
    ]);

    return (
        <>
            {loading ? <Loader /> : <></>}
            <section className="user-setting-section background_texture">
                <div className="setting-header">
                    <MobileBreadcrumb name="Setting" nav="/userDashboard/home" isLogout={false} />
                </div>
                <div className="settingLogo">
                    <img src={logo} className="settingLogoImg" />
                </div>
                <div className="radio-button-words">
                    <div
                        className={`radio-option ${selectedOption === 'Option 1' ? 'selected' : ''}`}
                        onClick={() => handleOptionClick('Option 1')}
                    >
                        Login Password
                    </div>
                    <div className="smallColumn"></div>
                    <div
                        className={`radio-option ${selectedOption === 'Option 2' ? 'selected' : ''}`}
                        onClick={() => handleOptionClick('Option 2')}
                    >
                        Withdrawal Password
                    </div>
                </div>
                {
                    selectedOption === "Option 1"
                        ?
                        <div className="changePasswordForm">
                            <div>
                                <i class="fa fa-lock"></i>
                                <input
                                    placeholder="Current Password"
                                    name="oldPass"
                                    value={passwordVal.oldPass}
                                    onChange={(e) => onChangeHandler(e)}
                                />
                            </div>
                            <div>
                                <i class="fa fa-unlock"></i>
                                <input
                                    placeholder="New Password"
                                    name="newPass"
                                    value={passwordVal.newPass}
                                    onChange={(e) => onChangeHandler(e)}
                                />
                            </div>
                            <div>
                                <i className="fa fa-key"></i>
                                <input
                                    placeholder="Confirm Password"
                                    name="cpass"
                                    value={passwordVal.cpass}
                                    onChange={(e) => onChangeHandler(e)}
                                />
                            </div>
                            <button onClick={() => changePassHandler()}>CONFIRM</button>
                        </div>
                        :
                        <div className="changePasswordForm">
                            <div>
                                <i class="fa fa-lock"></i>
                                <input
                                    placeholder="Current Withdrawal PIN"
                                    name="oldPin"
                                    value={pin.oldPin}
                                    onChange={(e) => onChangeHandlerAlt(e)}
                                />
                            </div>
                            <div>
                                <i class="fa fa-unlock"></i>
                                <input
                                    placeholder="New Withdrawal PIN"
                                    name="newPin"
                                    value={pin.newPin}
                                    onChange={(e) => onChangeHandlerAlt(e)}
                                />
                            </div>
                            <div>
                                <i className="fa fa-key"></i>
                                <input
                                    placeholder="Confirm Withdrawal PIN"
                                    name="cpin"
                                    value={pin.cpin}
                                    onChange={(e) => onChangeHandlerAlt(e)}
                                />
                            </div>
                            <button onClick={() => changePinHandler()}>CONFIRM</button>
                        </div>
                }
            </section>
            <BottomNav />
        </>
    )
}

export default UserSetting;