import { useSelector } from "react-redux";
import profile from "../../assets/images/redzy/profile.gif";
import BottomNav from "../mobileComponents/BottomNav";
import MobileBreadcrumb from "../mobileComponents/MobileBreadcrumb";
import { useEffect } from "react";
import { getUserJourney } from "../../states/actions/journeyAction";
import { useDispatch } from "react-redux";
import Loader from "../../components/loader/Loader";
import { getUserWallet } from "../../states/actions/walletAction";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { getAllNotification } from "../../states/actions/notificationAction";

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const { user } = useSelector(state => state.users);
    const { loading: journeyLoading, userJourney, creditLifes } = useSelector(state => state.userJourney);
    const { loading: walletLoading, userWallet } = useSelector(state => state.userWallet);
    const { loading: getInfoLoading, notifications } = useSelector(state => state.allNotification);

    const navigateTo = (val) => {
        return navigate(val);
    }

    const copyToClipboard = (val) => {
        navigator.clipboard.writeText(val);
        return alert.success("Reference code is copied!");
    }

    useEffect(() => {
        dispatch(getUserJourney());
        dispatch(getUserWallet());
        dispatch(getAllNotification());
    }, [
        dispatch
    ]);
    return (
        <>
            {journeyLoading || walletLoading || getInfoLoading ? <Loader /> : <></>}
            <section className="user-profile-section mobile-section-padding background_texture">
                <MobileBreadcrumb name="Profile" nav="/userDashboard/home" isLogout={true} />
                <div className="user-profile-details">
                    <div className="user-profile-details-parent">
                        <div className="user-profile-details-childs">
                            {/* <img src={profile} alt="profile" draggable={false} /> */}
                            <div className="profile-text-icon">
                                <h3>{user?.username[0]}</h3>
                            </div>
                        </div>
                        <div className="user-profile-details-childs">
                            <h3 className="sub-heading">Tasker Name</h3>
                            <h3 className="heading mt2">{user?.username}</h3>
                            <div className="user-profile-inner-details mt-4">
                                <div className="user-profile-inner-details-childs">
                                    <h2 className="sub-heading">Employee ID</h2>
                                    <p className="heading mt2" onClick={() => copyToClipboard(user?.adminCode)}>{user?.adminCode} <i className="fa fa-file-alt copy-btn ml2"></i></p>
                                </div>
                                <div className="user-profile-inner-details-childs">
                                    <h2 className="sub-heading">Total earned</h2>
                                    <p className="heading mt2">${userJourney?.todayRewards?.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-line-break"></div>
                    <div className="user-account-balance">
                        <div className="user-account-balance-childs">
                            <h3>Account Balance</h3>
                            <h2><span className="mr8">$</span>{userWallet?.value?.toFixed(2)}</h2>
                        </div>
                        <div className="user-account-balance-childs">
                            <div className="credit-score">
                                <ul>
                                    <li><i className={creditLifes && creditLifes >= 1 ? "fa fa-heart heart-active" : "fa fa-heart"}></i></li>
                                    <li><i className={creditLifes && creditLifes >= 2 ? "fa fa-heart heart-active" : "fa fa-heart"}></i></li>
                                    <li><i className={creditLifes && creditLifes >= 3 ? "fa fa-heart heart-active" : "fa fa-heart"}></i></li>
                                    <li><i className={creditLifes && creditLifes >= 4 ? "fa fa-heart heart-active" : "fa fa-heart"}></i></li>
                                    <li><i className={creditLifes && creditLifes >= 5 ? "fa fa-heart heart-active" : "fa fa-heart"}></i></li>
                                    <li><i className={creditLifes && creditLifes >= 6 ? "fa fa-heart heart-active" : "fa fa-heart"}></i></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="user-profile-subnav">
                    <h3 className="heading-lg">More Options</h3>
                    <ul>
                        <li onClick={() => navigateTo("/userDashboard/withdrawal")}>
                            <h2>Wallet Info</h2>
                            <i className="fa fa-angle-right"></i>
                        </li>
                        {
                            notifications?.filter(item => item._id !== "6535ea9f61fc4a5231ede89e")?.map((data, index) => (
                                <li onClick={() => navigateTo(`/userDashboard/rules/${data?._id}`)} key={index}>
                                    <h2>{data.parameterName}</h2>
                                    <i className="fa fa-angle-right"></i>
                                </li>
                            ))
                        }
                        {/* <li>
                            <h2>Reward</h2>
                            <i className="fa fa-angle-right"></i>
                        </li>
                        <li onClick={() => navigateTo("/userDashboard/rules")}>
                            <h2>Rules</h2>
                            <i className="fa fa-angle-right"></i>
                        </li>
                        <li onClick={() => navigateTo("/userDashboard/agentMode")}>
                            <h2>Agent Mode</h2>
                            <i className="fa fa-angle-right"></i>
                        </li>
                        <li onClick={() => navigateTo("/userDashboard/faq")}>
                            <h2>FAQs</h2>
                            <i className="fa fa-angle-right"></i>
                        </li>
                        <li onClick={() => navigateTo("/userDashboard/company")}>
                            <h2>About</h2>
                            <i className="fa fa-angle-right"></i>
                        </li> */}
                    </ul>
                </div>
            </section>
            <BottomNav />
        </>
    )
}

export default UserProfile;