import { useEffect } from "react";
import Breadcrumb from "../../Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/loader/Loader";
import moment from "moment";
import { useAlert } from "react-alert";
import { clearError, getWithdrawalRequest, resetDetails, withdrawalAnswerRequest } from ".././../../states/actions/withdrawalAction";

const WithdrawalIndex = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, allWithdrawalRequest, error } = useSelector(state => state.allWithdrawalRequest);
    const { loading: answerLoading, error: answerError, success: answerSuccess, message: answerMessage } = useSelector(state => state.withdrawalAnswer);

    const proceedToTransaction = (id, ans) => {
        dispatch(withdrawalAnswerRequest(id, ans));
    }

    useEffect(() => {
        dispatch(getWithdrawalRequest());

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (answerError) {
            alert.error(answerError);
            dispatch(clearError());
        }

        if (answerSuccess) {
            alert.success(answerMessage);
            dispatch(resetDetails());
        }

    }, [
        dispatch, 
        alert, 
        error, 
        answerError,
        answerSuccess,
        answerMessage
    ]);
    return (
        <>
            {loading || answerLoading ? <Loader /> : <></>}
            <Breadcrumb
                icon="fa fa-exchange-alt"
                heading="Withdrawal Request"
                subheading="You can manage withdrawal"
                isButtons={true}
            />
            <div className="dashboard-content">
                <div className="container-fluid">
                    <div className="row">
                        {
                            allWithdrawalRequest && allWithdrawalRequest.map((data, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="withdrawal-request-wrapper">
                                        <div className="widthdrawal-request-header">
                                            <h3>Amount: <span>$ {data?.changeValue}</span></h3>
                                        </div>
                                        <div className="withdrawal-request-details">
                                            <p>{data?.note}</p>
                                            <h4>Request Date: <span>{moment(data && data.createdAt).format("Do MMM YYYY, h:mm:ss a")}</span></h4>
                                            <h4>Request status: <span>{data?.status}</span></h4>
                                            <h4>Request Type: <span>{data?.type}</span></h4>
                                            <h4>User ID: <span>{data?.userId?._id}</span></h4>
                                            <h4>Username: <span>{data?.userId?.username}</span></h4>
                                            <h4>Wallet ID: <span>{data?.walletId?._id}</span></h4>
                                            <h4>Total Amount: <span>$ {data?.changeValue}</span></h4>
                                        </div>
                                        <div className="withdrawal-request-btn">
                                            <button className="confirm-btn" onClick={() => proceedToTransaction(data._id, "Accepted")}>CONFIRM</button>
                                            <button className="reject-btn" onClick={() => proceedToTransaction(data._id, "Rejected")}>REJECT</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default WithdrawalIndex;