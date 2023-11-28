import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../Breadcrumb";
import Loader from "../../../components/loader/Loader";
import { useAlert } from "react-alert";
import { clearError, fetchCommissionDetail, resetUpdate, updateCommission } from "../../../states/actions/commissionAction";

const UpdateCommission = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { id } = useParams();

    const { loading, commission, error } = useSelector(state => state.commissionDetail);
    const { loading: updateLoading, isUpdated, error: updateError, message } = useSelector(state => state.commission);

    const [commissionData, setCommissionData] = useState({
        level: "",
        commissionValue: "",
        ticketsNumber: ""
    });

    const onChangeHandler = (e) => {
        setCommissionData({ ...commissionData, [e.target.name]: e.target.value });
    }

    const submitHandler = () => {
        if (!commissionData.level || !commissionData.commissionValue) {
            return alert.error("Required field is missing, please try again!");
        }

        dispatch(updateCommission(id, commissionData.level, commissionData.commissionValue, commissionData.ticketsNumber));
    }

    useEffect(() => {
        if (commission && commission._id !== id) {
            dispatch(fetchCommissionDetail(id));
        } else {
            setCommissionData({
                level: commission.level,
                commissionValue: commission.commissionValue,
                ticketsNumber: commission.ticketsNumber
            });
        }

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (updateError) {
            alert.error(error);
            dispatch(clearError());
        }

        if (isUpdated) {
            alert.success(message);
            dispatch(resetUpdate());
            navigate("/dashboard/commissions");
        }

    }, [
        dispatch,
        navigate,
        id,
        commission,
        error,
        updateError,
        isUpdated,
        message,
        alert
    ]);

    return (
        <>
            {loading || updateLoading ? <Loader /> : <></>}
            <Breadcrumb
                icon="fa fa-pen"
                heading="Update Commission Level"
                subheading="You can update commission level"
                isButtons={false}
            />
            <div className="dashboard-content">
                <div className="dashboard-global-form">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="form-back-btn">
                                    <Link to="/dashboard/commissions"><i className="fa fa-angle-left"></i>Back</Link>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="dashboard-global-form-group">
                                        <label>Level <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Enter username"
                                            name="level"
                                            value={commissionData.level}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="dashboard-global-form-group">
                                        <label>Commission Value <span>*</span></label>
                                        <input
                                            type="number"
                                            placeholder="Enter commission value"
                                            name="commissionValue"
                                            value={commissionData.commissionValue}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="dashboard-global-form-group">
                                        <label>Tickets Number <span>*</span></label>
                                        <input
                                            type="number"
                                            placeholder="Enter ticket number"
                                            name="ticketsNumber"
                                            value={commissionData.ticketsNumber}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="dashboard-form-action">
                                        <button className="create-btn" onClick={() => submitHandler()}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateCommission;