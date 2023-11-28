import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, clearError } from "../../states/actions/userAction";
import Loader from "../../components/loader/Loader";
import { useAlert } from "react-alert";
import auth_logo from "../../assets/images/logo/logo_main_black.png";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { isAuthenticated, loading, error: loginError } = useSelector(state => state.users);

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: ""
    });

    const getUserInfo = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    const sendTo = () => {
        return navigate("/signup");
    }

    const proceedToLogin = () => {
        if (!userInfo.username) {
            return alert.error("Please enter username");
        }

        if (!userInfo.password) {
            return alert.error("Please enter password");
        }

        dispatch(login(userInfo.username, userInfo.password));
    }

    useEffect(() => {
        if (loginError) {
            alert.error(loginError);
            dispatch(clearError());
        }

        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [dispatch, loginError, isAuthenticated, navigate, alert]);

    return (
        <>
            {loading ? <Loader /> : <></>}
            <section className="auth-section auth-login-bg">
                <div className="auth-wrapper">
                    <div className="auth-parent">
                        <div className="auth-info">
                            <form onSubmit={(e) => e.preventDefault(e)}>
                                <div className="auth-logo-wrapper">
                                    <Link to="/ctrl-center/login">
                                        <img src={auth_logo} alt="auth_logo" draggable={false} />
                                    </Link>
                                </div>
                                <div className="auth-heading">
                                    <h3>LOGIN</h3>
                                </div>
                                <div className="auth-subtitle">
                                    <p>Thank you for getting back, please login to your account by filling these form</p>
                                </div>
                                <div className="global-form">
                                    <div className="form-groups">
                                        <label>Enter Username | Email</label>
                                        <input
                                            type="text"
                                            placeholder="example@gmail.com"
                                            name="username"
                                            value={userInfo.username}
                                            onChange={(e) => getUserInfo(e)}
                                        />
                                    </div>
                                    <div className="form-groups">
                                        <label>Enter Password</label>
                                        <input
                                            type="password"
                                            placeholder="*********"
                                            name="password"
                                            value={userInfo.password}
                                            onChange={(e) => getUserInfo(e)}
                                        />
                                    </div>
                                </div>
                                <div className="form-submit-btn">
                                    <button onClick={() => proceedToLogin()}>LOGIN</button>
                                    <button onClick={() => sendTo()}>SIGN UP</button>
                                </div>
                                <div className="auth-backpage">
                                    <Link to="/">
                                        <div className="auth-backpage-inner">
                                            <i className="fa fa-angle-left"></i>
                                        </div>
                                    </Link>
                                </div>
                                <div className="auth-copyright">
                                    <p>© 2023 | Thumbtrack</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;