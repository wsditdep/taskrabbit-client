import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader/Loader";
import logo_white from "../assets/images/logo/logo_main.png";
import logo_white_ from "../assets/images/logo/logo_main_white.png";
import { logout } from "../states/actions/userAction";

const Navigation = () => {
    const dispatch = useDispatch();
    const [isNav, setIsNav] = useState(false);

    const { isAuthenticated, loading } = useSelector(state => state.users);

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <>
            {loading ? <Loader /> : <></>}
            <section className="navigation-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="navigation-parent">
                                <div className="navigation-child">
                                    <div className="navigation-logo">
                                        <Link to="/">
                                            <img src={logo_white} className="logo_main" alt="logo" />
                                            <img src={logo_white_} className="logo_responsive" alt="logo" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="navigation-child">
                                    <div className={isNav ? "menu manageNav" : "menu"}>
                                        <div className="close-nav">
                                            <i className="fa fa-times" onClick={() => setIsNav(!isNav)}></i>
                                        </div>
                                        <ul>
                                            <li>
                                                <Link to="/">Home</Link>
                                            </li>
                                            <li>
                                                <Link to="/about">About Us</Link>
                                            </li>
                                            <li>
                                                <Link to="/services">Services</Link>
                                            </li>
                                            <li>
                                                <Link to="/reviews">Reviews</Link>
                                            </li>
                                            <li>
                                                <Link to="/#">Customer Care</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="navigation-child">
                                    <div className="navigation-action-btns">
                                        {
                                            isAuthenticated
                                            ?
                                            <>
                                                <button onClick={logoutHandler}>Logout <i className="fa fa-sign-in-alt"></i></button>
                                            </>
                                            :
                                                <>
                                                    <Link to="/login" className="ntn_login">
                                                        <li>LOGIN</li>
                                                    </Link>
                                                    <Link to="/signup" className="ntn_register">
                                                        <li>SIGN UP <i className="fas fa-sign-in-alt"></i></li>
                                                    </Link>
                                                </>
                                        }
                                        <div className="responsive-toggle-btn">
                                            <i className="fa fa-bars" onClick={() => setIsNav(!isNav)}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Navigation;