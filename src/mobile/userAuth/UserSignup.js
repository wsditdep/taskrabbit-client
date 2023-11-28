import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { clearError, resetAcc, signUp } from "../../states/actions/userAction";
import logo from "../../assets/images/redzy/taskrabbit.svg";


const UserSignup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const alert = useAlert();

    const { loading, isAccountCreated, error, message } = useSelector(state => state.user);

    const [userVal, setUserVal] = useState({
        phone: "",
        username: "",
        password: "",
        withdrawalPassword: "",
        refCode: ""
    });

    const onChangeHandler = (e) => {
        setUserVal({ ...userVal, [e.target.name]: e.target.value });
    }

    const proceedToRegister = () => {
        if (
            !userVal.phone
            ||
            !userVal.username
            ||
            !userVal.password
            ||
            !userVal.withdrawalPassword
            ||
            !userVal.refCode
        ) {
            return alert.error("Required field is mission!");
        }

        dispatch(signUp(
            userVal.phone,
            userVal.username,
            userVal.password,
            userVal.withdrawalPassword,
            userVal.refCode
        ));
    }

    const sendTo = (val) => {
        return navigate(val);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (isAccountCreated) {
            alert.success(message);
            navigate("/signin");
            dispatch(resetAcc());
        }
    }, [
        dispatch,
        navigate,
        isAccountCreated,
        error,
        alert,
        message
    ]);
    return (
        <>
            {loading ? <Loader /> : <></>}
            <section className="app-main-section">
                <div className="app-inner-view">
                    <section className="mobile-auth-section">
                        <div className="auth-logo">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="tab-wrapper">
                            <h3><span onClick={() => sendTo("/signin")}>LOGIN</span><span className="separate">|</span><span className="active" onClick={() => sendTo("/signup")}>SIGN UP</span></h3>
                        </div>
                        <div className="mobile-form">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="mobile-form-group">
                                    <i className="fa fa-mobile"></i>
                                    <input
                                        type="number"
                                        placeholder="Phone Number"
                                        name="phone"
                                        value={userVal.phone}
                                        onChange={(e) => onChangeHandler(e)}
                                    />
                                </div>
                                <div className="mobile-form-group">
                                    <i className="fa fa-user"></i>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        value={userVal.username}
                                        onChange={(e) => onChangeHandler(e)}
                                    />
                                </div>
                                <div className="mobile-form-group">
                                    <i className="fa fa-lock"></i>
                                    <input
                                        type="text"
                                        placeholder="Login Password"
                                        name="password"
                                        value={userVal.password}
                                        onChange={(e) => onChangeHandler(e)}
                                    />
                                </div>
                                <div className="mobile-form-group">
                                    <i className="fa fa-lock"></i>
                                    <input
                                        type="number"
                                        placeholder="Withdrawal Password"
                                        name="withdrawalPassword"
                                        value={userVal.withdrawalPassword}
                                        onChange={(e) => onChangeHandler(e)}
                                    />
                                </div>
                                <div className="mobile-form-group">
                                    <i className="fa fa-robot"></i>
                                    <input
                                        type="text"
                                        placeholder="Employee ID"
                                        name="refCode"
                                        value={userVal.refCode}
                                        onChange={(e) => onChangeHandler(e)}
                                    />
                                </div>
                                <div className="auth-submit-btns">
                                    <button className="global-btn global-btn-primary" onClick={() => proceedToRegister()}>REGISTER NOW</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </section>
        </>
    )
}

export default UserSignup;