import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { useAlert } from "react-alert";
import Loader from "../../../components/loader/Loader";
import { clearError, fetchUserDetails, resetDetail, updateUser } from "../../../states/actions/userAction";
import { chargeWallet, editWallet, getUserWalletById, resetNew, resetUpdate } from "../../../states/actions/walletAction";
import { fetchCommission } from "../../../states/actions/commissionAction";

const UserDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading: editAmountLoading, isUpdated, message: amountUpdateMessage } = useSelector(state => state.userWalletAmount);
    const { loading, user, error } = useSelector(state => state.userDetails);
    const { loading: walletLoading, userWallet, error: walletError } = useSelector(state => state.userWalletById);
    const { loading: chargeLoading, message: rechargeMessage, error: chargeError, success: rechargeSuccess } = useSelector(state => state.chargedWallet);

    const [isUpdateShow, setIsUpdateShow] = useState(false);

    const [amount, setAmount] = useState();

    const [walletVal, setWalletVal] = useState({
        clientId: "",
        walletId: "",
        chargeValue: ""
    });

    const [processType, setProcessType] = useState("Charging");

    const onChangeHandler = (e) => {
        setWalletVal({ ...walletVal, [e.target.name]: e.target.value });
    }

    const setAmountHandler = () => {
        if (!amount) {
            return alert.error("Please enter amount!");
        }

        dispatch(editWallet(walletVal.walletId, amount));
    }

    const submitHandler = () => {
        if (!walletVal.chargeValue) {
            return alert.error("Please enter amount!");
        }

        dispatch(chargeWallet(walletVal.clientId, walletVal.walletId, walletVal.chargeValue, processType));
    }

    const closeWindow = () => {
        return navigate("/dashboard/users");
    }

    // update::begin
    const { loading: commissionLoading, allCommissions } = useSelector(state => state.allCommissions);
    const { loading: updateLoading, isUpdated: updateInfo, error: updateError, message } = useSelector(state => state.userUpdate);

    const [userVal, setUserVal] = useState({
        accounLevel: "Bronze",
        accountStatus: "",
        password: "",
        withdrawalPin: "",
        walletAddress: ""
    });

    const onChnageHandler = (e) => {
        setUserVal({ ...userVal, [e.target.name]: e.target.value });
    }

    const updateHandler = () => {
        if (!userVal.accounLevel || !userVal.accountStatus) {
            return alert.error("Required field is missing!");
        }

        dispatch(updateUser(id, userVal.accounLevel, userVal.status, userVal.accountStatus , userVal.password, userVal.withdrawalPin, userVal.walletAddress));
    }

    useEffect(() => {

        if (updateError) {
            alert.error(updateError);
            dispatch(clearError());
        }

        if (updateInfo) {
            alert.success(message);
            dispatch(resetUpdate());
            navigate("/dashboard/users");
        }

        dispatch(fetchCommission());
    }, [
        dispatch,
        navigate,
        alert,
        id,
        user,
        updateInfo,
        updateError,
        message,
    ]);

    // update::end

    useEffect(() => {

        if (user && user?._id !== id) {
            dispatch(fetchUserDetails(id));
            dispatch(getUserWalletById(id));
        } else {
            setWalletVal({
                clientId: userWallet.clientId,
                walletId: userWallet._id,
                chargeValue: ""
            });
            setUserVal({
                accounLevel: user.accountLevel.level,
                accountStatus: user.accountStatus,
                accountStatus: user.accountStatus,
                withdrawalPin:  user.withdrawalPin,
                walletAddress:  user.walletAddress
            });
        }

        if (walletError) {
            alert.error(walletError);
        }
        if (error) {
            alert.error(walletError);
        }
        if (chargeError) {
            alert.error(chargeError);
        }
        if (rechargeSuccess) {
            alert.success(rechargeMessage);
            dispatch(resetNew());
            dispatch(resetDetail());
            navigate("/dashboard/users");
        }

        if (isUpdated) {
            alert.success(amountUpdateMessage);
            dispatch(resetUpdate());
            navigate("/dashboard/users");
        }

        dispatch(fetchCommission());
    }, [
        dispatch,
        navigate,
        id,
        walletError,
        error,
        alert,
        userWallet._id,
        userWallet.clientId,
        user,
        chargeError,
        rechargeMessage,
        rechargeSuccess,
        isUpdated,
        amountUpdateMessage
    ]);
    return (
        <>
            {loading || commissionLoading || updateLoading ? <Loader /> : <></>}
            {loading || walletLoading || editAmountLoading || chargeLoading ? <Loader /> : <></>}
            <div className="opoup_overlay" onClick={() => closeWindow()}></div>
            <div className="dashboard-content pop-up-box">
                <div className="dashboard-details-page-parent">
                    <div className="dashboard-detail-page">
                        <div className="dahboard-detail-wrapper">
                            <div className="dashboard-detail-profile-wrapper">
                                <h3><i className="fa fa-user"></i></h3>
                            </div>
                            <h1>{user?.username === undefined ? "NULL" : user?.username}</h1>
                            <h1>{user?.role === undefined ? "NULL" : user?.role}</h1>
                            <div className="dashboard-profile-details">
                                {/* <p><span>User ID :</span>{user?._id === undefined ? "NULL" : user?._id}</p> */}
                                <p><span>Ref Code :</span>{user?.adminCode === undefined ? "NULL" : user?.adminCode}</p>
                                <p><span>Username :</span>{user?.username === undefined ? "NULL" : user?.username}</p>
                                {/* <p><span>Email :</span>{user.email === undefined ? "NULL" : user.email}</p> */}
                                <p><span>Phone :</span>{user?.phone === undefined ? "NULL" : user?.phone}</p>
                                {/* <p><span>Status :</span>{user.status === undefined ? "NULL" : user.status}</p> */}
                                <p><span>Account Level :</span>{user?.accountLevel && user?.accountLevel?.level}</p>
                                <p><span>Created At :</span>{user?.createdAt === undefined ? "NULL" : moment(user?.createdAt).format("Do MMM YYYY")}</p>
                                <p><span>Updated At :</span>{user?.updatedAt === undefined ? "NULL" : moment(user?.updatedAt).format("Do MMM YYYY")}</p>
                            </div>
                            <div className="available-balance">
                                <h3>$ {userWallet && userWallet.value}</h3>
                                <p>Available Balance</p>
                            </div>


                            <div className="back-btn">
                                <Link to="/dashboard/users"><i className="fa fa-angle-left"></i> Back</Link>
                            </div>
                            <div className="update-btn">
                                <button onClick={() => setIsUpdateShow(!isUpdateShow)}>Change Amount Value</button>
                            </div>
                            {
                                isUpdateShow ?

                                    <div className="change-amount-val">
                                        <input
                                            type="number"
                                            placeholder="Enter Amount"
                                            name="amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                        <button onClick={() => setAmountHandler()}>Update</button>
                                    </div>
                                    :
                                    <></>
                            }
                        </div>
                    </div>
                    <div className="dashboard-detail-page">
                        <div className="dashboard-global-form">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="detail-page-heading">
                                            <h3>Recharge User Wallet</h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {/* <div className="col-md-12">
                                            <div className="dashboard-global-form-group">
                                                <label>Client ID <span>*</span></label>
                                                <input
                                                    type="password"
                                                    placeholder="Enter username"
                                                    name="clientId"
                                                    value={walletVal.clientId}
                                                    readOnly
                                                />
                                            </div>
                                        </div> */}
                                        {/* <div className="col-md-12">
                                            <div className="dashboard-global-form-group">
                                                <label>Wallet ID <span>*</span></label>
                                                <input
                                                    type="password"
                                                    placeholder="Enter password"
                                                    name="walletId"
                                                    value={walletVal.walletId}
                                                    readOnly
                                                />
                                            </div>
                                        </div> */}
                                        <div className="col-md-12">
                                            <div className="dashboard-global-form-group">
                                                <label>Amount <span>*</span></label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter amount"
                                                    name="chargeValue"
                                                    value={walletVal.chargeValue}
                                                    onChange={(e) => onChangeHandler(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="dashboard-global-form-group charge-group">
                                                <div className="charge-wrapper">
                                                    <input
                                                        type="radio"
                                                        value="Charging"
                                                        checked={processType === 'Charging'}
                                                        onChange={(e) => setProcessType(e.target.value)}
                                                    />
                                                    <p>Deposite</p>
                                                </div>
                                                <div className="charge-wrapper">
                                                    <input
                                                        type="radio"
                                                        value="Withdrawal-By-Admin"
                                                        checked={processType === 'Withdrawal-By-Admin'}
                                                        onChange={(e) => setProcessType(e.target.value)}
                                                    />
                                                    <p>Withdraw</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="dashboard-form-action">
                                                <button className="create-btn" onClick={() => submitHandler()}>Proceed</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="dashboard-global-form mt dashed-border">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="detail-page-heading">
                                            <h3>Update User Account</h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="dashboard-global-form-group">
                                                <label>Account Level</label>
                                                <select
                                                    name="accounLevel"
                                                    value={userVal.accounLevel}
                                                    onChange={(e) => onChnageHandler(e)}
                                                >
                                                    <option defaultValue={user.accountLevel && user.accountLevel._id}>--{user.accountLevel && user.accountLevel.level}--</option>
                                                    {
                                                        allCommissions && allCommissions.map((data, index) => (
                                                            <option value={data._id} key={index}>{data.level}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="dashboard-global-form-group">
                                                <label>Account Status</label>
                                                <select
                                                    name="accounLevel"
                                                    value={userVal.accounLevel}
                                                    onChange={(e) => onChnageHandler(e)}
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Blocked">Blocked</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="dashboard-global-form-group">
                                                <label>Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="New Password"
                                                    name="password"
                                                    value={userVal.password}
                                                    onChange={(e) => onChnageHandler(e)}
                                                />
                                            </div>
                                            <div className="dashboard-global-form-group">
                                                <label>Withdrawal PIN</label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter Withdrawal PIN"
                                                    name="withdrawalPin"
                                                    value={userVal.withdrawalPin}
                                                    onChange={(e) => onChnageHandler(e)}
                                                />
                                            </div>
                                            <div className="dashboard-global-form-group">
                                                <label>Wallet Address</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Wallet Address"
                                                    name="walletAddress"
                                                    value={userVal.walletAddress}
                                                    onChange={(e) => onChnageHandler(e)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="dashboard-form-action">
                                                <button className="create-btn" onClick={() => updateHandler()}>Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDetails; 