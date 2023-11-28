import { useEffect } from "react";
import AreaRoomAdmin from "./dashboardComponents/AreaRoomAdmin";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../states/actions/walletAction";
import transaction from "../assets/images/redzy/transaction.png";
import Loader from "../components/loader/Loader";
import moment from "moment";

const WebTrafic = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.users);
    const { loading, transactionHistory } = useSelector(state => state.transactions);

    useEffect(() => {
        dispatch(getTransactions());
    }, [dispatch])

    return (
        <>
            {loading ? <Loader /> : <></>}
            <div className="webtrafic-wrapper">
                <div className="webtrafic-parents">
                    <div className="webtrafic-childs">

                        {
                            user?.role === "Super-Admin"
                                ?
                                <div className="show-recent-users">
                                    <div className="d-card">
                                        <div className="d-card-header card-header-padding d-card-heading-font">
                                            <div className="d-card-recently-join-users">
                                                <p>TRANSACTIONS</p>
                                                <h3>Recent Transactions</h3>
                                            </div>
                                            <div className="d-card-recently-join-users">
                                                <button className="d-btn-transparent-disable">RECENTLY</button>
                                            </div>
                                        </div>
                                        <div className="d-card-body card-body-padding d-card-body-bg-color">
                                            {
                                                transactionHistory && transactionHistory.slice(0, 5).map((data, index) => (
                                                    <ul key={index}>
                                                        <li>
                                                            <div className="useranalytic-profile-picture">
                                                                <div className="useranalytic-profile-picture-inner">
                                                                    <img src={transaction} alt="useranalytics" />
                                                                </div>
                                                                <div className="useranalytic-profile-picture-inner">
                                                                    <h2 style={{ fontSize: "0.9rem" }}>{data?.type} | Transacted by: {data?.adminId?.username}</h2>
                                                                    <p style={{ fontSize: "0.9rem" }}>{data?.changeValue} | {data?.status}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="card-action-btn">
                                                                <span className="recent-user-date" style={{ whiteSpace: "nowrap" }}>{moment(data?.createdAt).format("Do MMM YYYY, h:mm a")}</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="show-recent-users">
                                    <div className="d-card">
                                        <div className="d-card-header card-header-padding d-card-heading-font">
                                            <div className="d-card-recently-join-users">
                                                <p>PROGRESS</p>
                                                <h3>Recent Users</h3>
                                            </div>
                                            <div className="d-card-recently-join-users">
                                                <button className="d-btn-transparent-disable">RECENTLY</button>
                                            </div>
                                        </div>
                                        <div className="d-card-body card-body-padding d-card-body-bg-color">
                                            <ul>
                                                <li>
                                                    <div className="useranalytic-profile-picture">
                                                        <div className="useranalytic-profile-picture-inner">
                                                            <img src="https://tokyo-black-nextjs-js.bloomui.com/static/images/avatars/1.jpg" alt="useranalytics" />
                                                        </div>
                                                        <div className="useranalytic-profile-picture-inner">
                                                            <h2>Munroe Dacks</h2>
                                                            <p>Senior Cost Accountant at</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-action-btn">
                                                        <span className="recent-user-date">30 Aug 2023 - 3:35PM</span>
                                                        <button className="d-btn-outline-sm">View</button>
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <div className="useranalytic-profile-picture">
                                                        <div className="useranalytic-profile-picture-inner">
                                                            <img src="https://tokyo-black-nextjs-js.bloomui.com/static/images/avatars/2.jpg" alt="useranalytics" />
                                                        </div>
                                                        <div className="useranalytic-profile-picture-inner">
                                                            <h2>Munroe Dacks</h2>
                                                            <p>Senior Cost Accountant at</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-action-btn">
                                                        <span className="recent-user-date">28 Aug 2023 - 3:35PM</span>
                                                        <button className="d-btn-outline-sm">View</button>
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <div className="useranalytic-profile-picture">
                                                        <div className="useranalytic-profile-picture-inner">
                                                            <img src="https://tokyo-black-nextjs-js.bloomui.com/static/images/avatars/3.jpg" alt="useranalytics" />
                                                        </div>
                                                        <div className="useranalytic-profile-picture-inner">
                                                            <h2>Munroe Dacks</h2>
                                                            <p>Senior Cost Accountant at</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-action-btn">
                                                        <span className="recent-user-date">25 Aug 2023 - 3:35PM</span>
                                                        <button className="d-btn-outline-sm">View</button>
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <div className="useranalytic-profile-picture">
                                                        <div className="useranalytic-profile-picture-inner">
                                                            <img src="https://tokyo-black-nextjs-js.bloomui.com/static/images/avatars/4.jpg" alt="useranalytics" />
                                                        </div>
                                                        <div className="useranalytic-profile-picture-inner">
                                                            <h2>Munroe Dacks</h2>
                                                            <p>Senior Cost Accountant at</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-action-btn">
                                                        <span className="recent-user-date">22 Aug 2023 - 9:00PM</span>
                                                        <button className="d-btn-outline-sm">View</button>
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <div className="useranalytic-profile-picture">
                                                        <div className="useranalytic-profile-picture-inner">
                                                            <img src="https://tokyo-black-nextjs-js.bloomui.com/static/images/avatars/5.jpg" alt="useranalytics" />
                                                        </div>
                                                        <div className="useranalytic-profile-picture-inner">
                                                            <h2>Munroe Dacks</h2>
                                                            <p>Senior Cost Accountant at</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="card-action-btn">
                                                        <span className="recent-user-date">21 Aug 2023 - 4:35PM</span>
                                                        <button className="d-btn-outline-sm">View</button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                        }

                    </div>
                    <div className="webtrafic-childs">
                        <AreaRoomAdmin />
                    </div>
                </div>
            </div>
        </>
    )
}

export default WebTrafic;