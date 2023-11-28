import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError, logout } from ".././../states/actions/userAction";
import Loader from "../../components/loader/Loader";
import logo from "../../assets/images/redzy/taskrabbit.svg";

const UserLogin = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, isAuthenticated, error, user } = useSelector(state => state.users);

    const [userVal, setUserVal] = useState({
        username: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        setUserVal({ ...userVal, [e.target.name]: e.target.value });
    }

    const proceedToLogin = () => {
        if (!userVal.username || !userVal.password) {
            return alert.error("Username or password is missing!");
        }

        dispatch(login(userVal.username, userVal.password));
    }

    const sendTo = (val) => {
        return navigate(val);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (isAuthenticated) {
            if (user.role === "Super-Admin" || user.role === "Admin") {
                alert.error("Access Denied!");
                dispatch(logout());
                navigate("/signin");
                window.location.reload(false);
            } else {
                navigate("/userDashboard/start");
            }
        }
    }, [dispatch, navigate, isAuthenticated, alert, error]);
    return (
        <>
            {loading ? <Loader /> : <></>}
            <section className="app-main-section">
                <div className="app-inner-view">
                    <section className="mobile-auth-section">
                        <div className="auth-logo">
                            <img src={logo} alt="logo" />
                        </div>
                        {/* <div className="task_name">
                            <h1>task</h1>
                        </div> */}
                        <div className="tab-wrapper">
                            <h3><span className="active" onClick={() => sendTo("/signin")}>LOGIN</span><span className="separate">|</span><span onClick={() => sendTo("/signup")}>SIGN UP</span></h3>
                        </div>
                        <div className="mobile-form">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="mobile-form-group">
                                    <i className="fa fa-user"></i>
                                    <input
                                        type="text"
                                        placeholder="Username/Phone Number"
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
                                <div className="auth-submit-btns">
                                    <button className="global-btn global-btn-primary" onClick={() => proceedToLogin()}>LOGIN</button>
                                    <p className="note">By clicking login, I agree to Taskrabbit's Terms and Policy. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </section>
        </>
    )
}

export default UserLogin;