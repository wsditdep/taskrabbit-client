import { useEffect, useState } from "react";
import logo from "../../assets/images/redzy/taskrabbit_logo.png"
import historyLogo from "../../assets/images/redzy/historyLogo.png"
import BottomNav from "../mobileComponents/BottomNav";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearError, getUserWallet, resetNew, saveWalletAddress } from "../../states/actions/walletAction";
import Loader from "../../components/loader/Loader";
import { withdrawal, clearError as reqWithdrawalError } from "../../states/actions/withdrawalAction";


const UserWithdrawal = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading: walletLoading, userWallet } = useSelector(state => state.userWallet);
    const { loading: loadUserLoading, user } = useSelector(state => state.users);
    const { loading: saveWalletLoading, error: saveWalletError, success, message } = useSelector(state => state.saveWallet);
    const [isWallet, setIsWallet] = useState(JSON.parse(localStorage.getItem("walletAddress")) || "null");
    const { loading, error } = useSelector(state => state.userWithdrawal);

    console.log(userWallet)

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const [selectedOption, setSelectedOption] = useState(isWallet?.type) || "TRC20";
    const [userVal, setUserVal] = useState({
        address: isWallet?.address || "",
        name: user.username || "",
        withdrawalAmount: "",
        withdrawalPin: ""
    });

    const onChangeHandler = (e) => {
        setUserVal({ ...userVal, [e.target.name]: e.target.value });
    }

    const submitHandler = () => {
        if (!userVal.address || !userVal.name) {
            return alert.error("Required field is missing!");
        }

        dispatch(saveWalletAddress(userVal.address, selectedOption, userVal.name));
    }


    const proceedForWithdrawal = () => {
        if (!userVal.withdrawalPin) {
            return alert.error("Please enter withdrawal PIN!");
        }
        dispatch(withdrawal(userVal.withdrawalPin));
    }

    const sendTo = () => {
        return navigate("/userDashboard/withdrawalHistory");
    }

    useEffect(() => {
        if (saveWalletError) {
            alert.error(saveWalletError);
            dispatch(clearError());
        }

        if (success) {
            alert.success(message);
            navigate("/userDashboard/withdrawal");
            dispatch(resetNew());

            localStorage.setItem("walletAddress", JSON.stringify({
                user: user.username,
                address: userVal.address,
                name: userVal.name,
                type: selectedOption,
                isWalletAddress: true
            }));
            return navigate("/userDashboard/home");

        }

        if (error) {
            alert.error(error);
            dispatch(reqWithdrawalError());
        }

        dispatch(getUserWallet());

    }, [dispatch, navigate, alert, saveWalletError, success, message, error]);
    return (
        <>
            {loadUserLoading || saveWalletLoading || walletLoading || loading ? <Loader /> : <></>}
            <section className="user-withdrawal-section">
                <div className="backgroundImg">
                    <div className="withdrawal-page-header">
                        <Link to={`/userDashboard/userProfile`} className="backBtn">
                            <i className="fa fa-angle-left"></i>
                        </Link>
                        <span>
                            Withdrawal
                        </span>
                        <a><img src={historyLogo} onClick={() => sendTo()} /></a>
                    </div>
                    <div className="pageDes">
                        <span>Last step to get your salary</span>
                    </div>

                </div>
                <div className="cards">
                    <div className="withdrawalLogo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="accountBalance">
                        <span>
                            Account Balance
                        </span>
                    </div>
                    <div className="withdrawalLogo">
                        <span>
                            USD {userWallet?.value?.toFixed(2)}
                        </span>
                    </div>


                    <div className="withdrawalName">
                        <input
                            placeholder="NAME"
                            name="name"
                            value={userVal.name}
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>
                    <div className="withdrawalName">
                        <input
                            placeholder="WALLET ADDRESS"
                            name="address"
                            value={userVal.address}
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>
                    <div className="radio-button-container">
                        <label>
                            <input
                                type="radio"
                                value="TRC20"
                                checked={selectedOption === 'TRC20'}
                                onChange={handleOptionChange}
                                disabled={isWallet !== "null" ? true : false}
                            />
                            <span className="switch">TRC20</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="ERC20"
                                checked={selectedOption === 'ERC20'}
                                onChange={handleOptionChange}
                                disabled={isWallet !== "null" ? true : false}
                            />

                            <span className="switch">ERC20</span>
                        </label>
                    </div>
                    {
                        isWallet !== "null"
                            ?
                            <>
                                {/* <div className="withdrawalLogo usdtAmount">
                                    <span>
                                        USD {userWallet?.value?.toFixed(2)}
                                    </span>
                                </div> */}
                                <div className="withdrawalName withdrawalAmount d-none">
                                    <input
                                        placeholder="Withdrawal Amount"
                                        name="withdrawalAmount"
                                        value={userVal.withdrawalAmount}
                                        onChange={(e) => onChangeHandler(e)}
                                    />
                                </div>
                                <div className="withdrawalName withdrawalAmount normal_withdrawal_pin_input">
                                    <input
                                        placeholder="Withdrawal PIN"
                                        name="withdrawalPin"
                                        value={userVal.withdrawalPin}
                                        onChange={(e) => onChangeHandler(e)}
                                    />
                                </div>
                            </>
                            :
                            <>
                            </>
                    }
                </div>
                {
                    isWallet === "null"
                        ?
                        <button class="withdrawalBtn" onClick={() => submitHandler()}>Save</button>
                        :
                        <button class="withdrawalBtn" onClick={() => proceedForWithdrawal()}>WITHDRAWAL</button>
                }
                <div className="whyTastrabbitText">
                    <span>
                        TaskRabbit will only withdraw by Cryptocurrency
                    </span>
                </div>

                <div className="answerWhyTastrabbitText">
                    <span>
                        Now you are assigning job to Taskrabbit Pro from all around the world cryptocurrency is the fastest and stable way to get paid oversea
                    </span>
                </div>
            </section>
            <BottomNav />
        </>
    )
}

export default UserWithdrawal;