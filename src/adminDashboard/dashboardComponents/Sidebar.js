import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../states/actions/userAction";
import Loader from "../../components/loader/Loader";
import Conformation from "../conformation/Conformation";
import { useState } from "react";

const Sidebar = ({ navHandler }) => {
    const dispatch = useDispatch();

    const { loading, user } = useSelector(state => state.users);
    const [confirmBox, setConformBox] = useState(false);

    const proceesToConfirm = () => {
        return setConformBox(true);
    }

    const proceedToLogout = () => {
        dispatch(logout());
    }

    return (
        <>
            {loading ? <Loader /> : <></>}
            {confirmBox ? <Conformation setConformBox={setConformBox} proceedFurther={proceedToLogout} /> : <></>}
            <div className="sidebar-wrapper">
                <div className="version-controls">
                    <h3>Thumbtrack</h3>
                    <i className="fa fa-times-circle" onClick={()=> navHandler(false)}></i>
                </div>
                <div className="sidebar-profile">
                    <div className="submenu-wrappwr">
                        <div className="profile-submenu">
                            <i className="fa fa-ellipsis-v"></i>
                        </div>
                    </div>
                    <div className="profile-image">
                        <div className="my-profile-wrap">
                            <h2>{user && user.username && user.username[0].toUpperCase()}</h2>
                        </div>
                        <p>{user?.username}</p>
                        <span>{user?.role}</span>
                    </div>
                </div>
                <div className="dashboard-menu">
                    <ul>
                        <p>DASHBOARD</p>
                        <Link to="/dashboard" onClick={()=> navHandler(false)}>
                            <li>
                                <i className="fa fa-home"></i>Home
                            </li>
                        </Link>
                    </ul>
                    <ul>
                        <p>MANAGEMENT</p>
                        <Link to="/dashboard/users" onClick={()=> navHandler(false)}>
                            <li>
                                <i className="fa fa-user"></i>Users
                            </li>
                        </Link>
                        <Link to="/dashboard/products" onClick={()=> navHandler(false)}>
                            <li>
                                <i className="fa fa-box"></i>Products
                            </li>
                        </Link>
                        <Link to="/dashboard/commissions" onClick={()=> navHandler(false)}>
                            <li>
                                <i className="fa fa-share"></i>Commission
                            </li>
                        </Link>
                        <Link to="/dashboard/createCustomJourney" onClick={()=> navHandler(false)}>
                            <li>
                                <i className="fa fa-cogs"></i>Custom Journey
                            </li>
                        </Link>
                    </ul>
                    <ul>
                        <p>TRANSACTIONS</p>
                        <Link to="/dashboard/withdrawals" onClick={()=> navHandler(false)}>
                            <li>
                                <i className="fa fa-exchange-alt"></i>Withdrawal
                            </li>
                        </Link>
                    </ul>
                    {/* <ul>
                        <p>NOTIFICATIONS</p>
                        <Link to="/#">
                            <li>
                                <i className="fa fa-clock"></i>History
                            </li>
                        </Link>
                    </ul> */}
                </div>
                <div className="side-bar-footer">
                    <div className="sidebar-footer-parent">
                        <div className="sidebar-footer-childs d-none">
                            <button><div className="active-animation"></div><i className="fa fa-comment-alt"></i></button>
                        </div>
                        <div className="sidebar-footer-childs">
                            <button onClick={() => proceesToConfirm()}><i className="fa fa-power-off"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;