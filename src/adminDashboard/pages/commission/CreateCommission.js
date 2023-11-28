import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../Breadcrumb";
import Loader from "../../../components/loader/Loader";
import { useAlert } from "react-alert";
import { clearError, createCommission, resetNew } from "../../../states/actions/commissionAction";

const CreateCommission = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const { loading, success, error, message } = useSelector(state => state.newCommission);

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

        dispatch(createCommission(commissionData.level, commissionData.commissionValue, commissionData.ticketsNumber));
    }

    useEffect(() => {
        if (success) {
            alert.success(message);
            dispatch(resetNew());
            navigate("/dashboard/commissions");
        }

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
    }, [dispatch, success, error, navigate, alert, message]);

    return (
        <>
            {loading ? <Loader /> : <></>}
            <Breadcrumb
                icon="fa fa-share"
                heading="Add New Commission Level"
                subheading="Create new commission level"
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
                                        <button className="create-btn" onClick={() => submitHandler()}>Create</button>
                                        <button className="cancel-btn">Cancel</button>
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

export default CreateCommission;