import { useDispatch, useSelector } from "react-redux";
import BottomNav from "../mobileComponents/BottomNav";
import MobileBreadcrumb from "../mobileComponents/MobileBreadcrumb";
import Loader from "../../components/loader/Loader";
import moment from "moment";
import { useEffect, useState } from "react";
import { getUserWallet } from "../../states/actions/walletAction";
import { getUserAllHistory, getUserJourneyHistoryById } from "../../states/actions/journeyAction";

const UserHistory = () => {
    const dispatch = useDispatch();

    const { loading, userAllJourney } = useSelector(state => state.userAllHistory);
    const { loading: historyLoading, userJourneyHistoryById: allHistory, success } = useSelector(state => state.userJourneyHistory);

    const [allData, setAllData] = useState(allHistory);

    const resetAll = () => {
        return setAllData(allHistory);
    }

    const pendingOnly = () => {
        const pendingArray = allHistory.filter(obj => obj.status === 'Pending');
        return setAllData(pendingArray);
    }

    const completedOnly = () => {
        const compltedArray = allHistory.filter(obj => obj.status === 'Submitted');
        return setAllData(compltedArray);
    }

    useEffect(() => {
        dispatch(getUserWallet());
        dispatch(getUserAllHistory());

        if (success) {
            resetAll();
        }

        if (userAllJourney?._id) {
            dispatch(getUserJourneyHistoryById(userAllJourney?._id));
        }

    }, [dispatch, userAllJourney?._id, success]);

    return (
        <>
            {loading || historyLoading ? <Loader /> : <></>}
            <section className="user-history-section">
                <div className="backgroundImg">
                    <MobileBreadcrumb name="History" nav="/userDashboard/home" isLogout={false} color={'#fff'} />
                    <div className="historyNavBar">
                        <div className="navBarBtns">
                            <button onClick={() => resetAll()}>ALL</button>
                            <button onClick={() => pendingOnly()}>Pending</button>
                            <button onClick={() => completedOnly()}>Completed</button>
                        </div>
                    </div>
                </div>
                <div className="cards">
                    {
                        allData && allData.map((data, index) => (
                            <div className="card" key={index}>
                                <div className={data?.status === "Pending" ? "leftLine addAnimation" : "leftLine"} ></div>
                                {/* <div className="leftLine" ></div> */}
                                <div className="mainDataCard">
                                    <div className="dateCard">
                                        <span>{moment(data?.createdAt).format("Do MMM YYYY, h:mm a")}</span>
                                    </div>
                                    <div className="infoCard">
                                        <h2>
                                            {data?.product?.name}
                                        </h2>
                                        <span>
                                            {data?.status}
                                        </span>
                                    </div>
                                    <div className="priceInfo">
                                        <div className="totalPrice">
                                            {
                                                data?.name === "Referral Profit"
                                                    ?
                                                    <></>
                                                    :
                                                    <>
                                                        <h3>Total Price</h3>
                                                        <span>
                                                            $ {data?.product?.price}
                                                        </span>
                                                    </>
                                            }
                                        </div>
                                        <div className="commission">
                                            <h3>Commission</h3>
                                            <span>
                                                $ {data?.commission}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </section>
            <BottomNav />
        </>
    )
}

export default UserHistory;