import MobileBreadcrumb from "../mobileComponents/MobileBreadcrumb";
import profile from "../../assets/images/redzy/profile.gif";
import logo from "../../assets/images/redzy/taskrabbit_logo.png";
import BottomNav from "../mobileComponents/BottomNav";
import { useDispatch, useSelector } from "react-redux";
import reward from "../../assets/images/redzy/rewards.png";
import { useEffect, useState } from "react";
import { clearError, getUserAllHistory, getUserJourney, getUserJourneyHistoryById, placeJourney, resetDetails } from "../../states/actions/journeyAction";
import Loader from "../../components/loader/Loader";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { getUserWallet } from "../../states/actions/walletAction";


const UserJourney = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const [isReward, setIsReward] = useState(false);

    const { loading: walletLoading, userWallet } = useSelector(state => state.userWallet);
    const { loading: journeyLoading, userJourney } = useSelector(state => state.userJourney);
    const { loading: placeOrderLoading, userPlacedJourney, success: placeOrderSuccess, error: userPlacedOrderError } = useSelector(state => state.userPlacedOrder);

    const { loading, userAllJourney } = useSelector(state => state.userAllHistory);
    const { loading: historyLoading, userJourneyHistoryById: allHistory } = useSelector(state => state.userJourneyHistory);

    const placedOrder = (id) => {
        return dispatch(placeJourney(id));
    }

    useEffect(() => {
        dispatch(getUserJourney());
        dispatch(getUserWallet());
        dispatch(getUserAllHistory());

        if (placeOrderSuccess) {
            dispatch(resetDetails());
            if (userPlacedJourney?.couponsReward !== null) {
                setIsReward(!isReward);
            } else {
                navigate("/userDashboard/journey/start-journey");
            }
        }

        if (userPlacedOrderError) {
            alert.error(userPlacedOrderError);
            dispatch(clearError());
        }

        if (userAllJourney?._id) {
            dispatch(getUserJourneyHistoryById(userAllJourney?._id));
        }

    }, [
        dispatch,
        navigate,
        alert,
        placeOrderSuccess,
        userPlacedOrderError,
        userAllJourney?._id
    ]);

    return (
        <>
            {loading || journeyLoading || placeOrderLoading || walletLoading || historyLoading ? <Loader /> : <></>}
            {
                isReward
                    ?
                    <div className="show-rewards">
                        <div className="show-rewards-inner">
                            <img src={reward} alt="rewards" />
                            <h3>You are in few steps to get the rewards</h3>
                            <Link to="/userDashboard/journey/start-journey">
                                <button onClick={() => setIsReward(false)}>COUNTINUE</button>
                            </Link>
                        </div>
                    </div>
                    :
                    <></>
            }
            <section className="user-journey-section mobile-section-padding background_texture">
                <MobileBreadcrumb name="Job Assigning" nav="/userDashboard/home" isLogout={false} />
                <div className="journey-wrapper">
                    <div className="journey-wrapper-childs">
                        <img src={profile} alt="pro" draggable={false} />
                    </div>
                    <div className="journey-wrapper-childs">
                        <h2 className="sub-heading">Account Balance</h2>
                        <h1 className="heading mt4">USD {userWallet?.value?.toFixed(2)}</h1>
                    </div>
                </div>
                <div className="journey-info">
                    <div className="journey-info-childs">
                        <div className="earning-plan">
                            <h1><i className="fas fa-money-check mr8"></i>Taskrabbit Bar</h1>
                            <div className="user-journey-progress-bar">
                                <div className="progress-circle-wrapper" style={{ background: `conic-gradient(from 270deg, #B7FF45 ${(360 / userJourney?.maxStagesNumber) * userJourney?.currentStage}deg, #4e4e61 0deg)` }}>
                                    {/* <div className="progress-circle-wrapper" style={{ background: `conic-gradient(from 270deg, rgb(0, 183, 18) 100deg, ${(360 / (userJourney?.maxStagesNumber)) * ((userJourney?.currentStage) - 1)}deg, rgb(218, 218, 218) 0deg)` }}> */}
                                    <div className="progress-circle-inner-wrapper">
                                        {/* <h3>40%</h3> */}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="progress-info">
                                <h3>10 Task</h3>
                                <p>of 35 task</p>
                            </div> */}
                        </div>
                    </div>
                    <div className="journey-info-childs">
                        <div className="journey-info-inner-childs">
                            <h3 className="sub-heading"><i className="fas fa-hand-holding-usd mr4"></i> Daily Wages</h3>
                            <h1 className="heading-md mt4">USD {userJourney?.todayRewards?.toFixed(2)}</h1>
                        </div>
                        <div className="journey-info-inner-childs">
                            {/* <div className="journey-info-inner-childs-alt">
                                <p className="sub-heading">Today's</p>
                                <p className="sub-heading">Journey</p>
                                <h3 className="heading">35</h3>
                            </div> */}
                            <div className="journey-info-inner-childs-alt">
                                <p className="sub-heading">Job</p>
                                <p className="sub-heading">Assigned</p>
                                <h3 className="heading">{userJourney?.currentStage}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="journey-history-wrapper">
                    <h2 className="heading-lg">History</h2>
                    <ul>
                        {
                            allHistory && allHistory.slice(0, 4).map((data, index) => (
                                <li key={index}>
                                    <div className="journey-history-list">
                                        <img src={logo} alt="logo" draggable={false} />
                                    </div>
                                    <div className="journey-history-list-title">
                                        <p>{data?.product?.name}</p>
                                    </div>
                                    <div className="journey-history-list-amount">
                                        <h3><span className="mr8">$</span>{(Number(data?.commission) + Number(data?.product?.price)).toFixed(2)}</h3>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {
                    loading || placeOrderLoading
                        ?
                        <>
                        </>
                        :
                        <>
                            <div className="start-journey-btn">
                                <button className="global-btn global-btn-primary" onClick={() => placedOrder(userJourney?._id)}>Assign Job Now</button>
                            </div>
                        </>
                }
            </section>
            <BottomNav />
        </>
    );
}

export default UserJourney;