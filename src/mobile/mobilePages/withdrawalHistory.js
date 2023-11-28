import { useDispatch, useSelector } from "react-redux";
import BottomNav from "../mobileComponents/BottomNav";
import MobileBreadcrumb from "../mobileComponents/MobileBreadcrumb";
import Loader from "../../components/loader/Loader";
import moment from "moment";
import { useEffect } from "react";
import { getTransactionHistory, getUserWallet } from "../../states/actions/walletAction";

const WithdrawalHistory = () => {
    const dispatch = useDispatch();

    const { loading: walletLoading, userWallet, success } = useSelector(state => state.userWallet);
    const { loading, transactionHistory } = useSelector(state => state.transactionHistory);


    useEffect(() => {
        dispatch(getUserWallet());

        if (success) {
            dispatch(getTransactionHistory(userWallet?._id));
        }

        if (userWallet?._id) {
            dispatch(getTransactionHistory(userWallet?._id));
        }
    }, [dispatch, success])

    return (
        <>
            {walletLoading || loading ? <Loader /> : <></>}
            <section className="user-history-section background_texture">
                <div className="withdrawal-padding">
                    <MobileBreadcrumb name="Payment History" nav="/userDashboard/home" isLogout={false} />
                </div>
                {/* <div className="cards">
                    {
                        transactionHistory && transactionHistory.map((data, index) => (
                            <div className="card" key={index}>
                                <div className="leftLine"></div>
                                <div className="mainDataCard">
                                    <div className="dateCard">
                                        <span>{moment(data?.createdAt).format("Do MMM YYYY, h:mm a")}</span>
                                    </div>
                                    <div className="infoCard">
                                        <h2>
                                            {
                                                data?.type === "Withdrawal-By-Admin"
                                                    ?
                                                    "Withdrawal"
                                                    :
                                                    data?.type
                                            }
                                        </h2>
                                        <span>
                                            {data?.status}
                                        </span>
                                    </div>
                                    <div className="priceInfo">
                                        <div className="totalPrice">
                                            <h3>Amount</h3>
                                            <span>
                                                {
                                                    data?.type === "Withdrawal-By-Admin"
                                                        ?
                                                        "- "
                                                        :
                                                        "+ "
                                                }
                                                {data?.changeValue}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )).reverse()
                    }
                </div> */}
                {
                    transactionHistory && transactionHistory.map((data, index) => (
                        <div className="withdrawal-history" key={index}>
                            <div className="withdrawal-history-parent">
                                <div className="withdrawal-history-child">
                                    <div className="withdrawal-icon">
                                        <i className="fa fa-bell"></i>
                                    </div>
                                </div>
                                <div className="withdrawal-history-child">
                                    <h3>
                                        {
                                            data?.type === "Withdrawal-By-Admin"
                                                ?
                                                "Withdrawal"
                                                :
                                                data?.type
                                        }
                                    </h3>
                                    <p>{data?.status}</p>
                                </div>
                                <div className="withdrawal-history-child">
                                    <h3>$ {data?.changeValue}</h3>
                                    <h4>{moment(data?.createdAt).format("D/MM/YYYY")}</h4>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </section>
            <BottomNav />
        </>
    )
}

export default WithdrawalHistory;