import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../Breadcrumb";
import Loader from "../../../components/loader/Loader";
import { useAlert } from "react-alert";
import { clearError, fetchUserDetails, resetUpdate, updateUser } from "../../../states/actions/userAction";
import { fetchCommission } from "../../../states/actions/commissionAction";

const UpdateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const alert = useAlert();

    const { loading, user } = useSelector(state => state.userDetails);
    const { loading: updateLoading, isUpdated, error: updateError, message } = useSelector(state => state.userUpdate);
    const { loading: commissionLoading, allCommissions } = useSelector(state => state.allCommissions);

    const [userVal, setUserVal] = useState({
        accounLevel: "",
        accountStatus: ""
    });

    const onChnageHandler = (e) => {
        setUserVal({ ...userVal, [e.target.name]: e.target.value });
    }

    const submitHandler = () => {
        if (!userVal.accounLevel || !userVal.accountStatus) {
            return alert.error("Required field is missing!");
        }

        dispatch(updateUser(id, userVal.accounLevel, userVal.status, userVal.accountStatus));
    }

    useEffect(() => {
        if (user && user._id !== id) {
            dispatch(fetchUserDetails(id));
        } else {
            setUserVal({
                accounLevel: user.accountLevel.level,
                accountStatus: user.accountStatus
            });
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearError());
        }

        if(isUpdated) {
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
        isUpdated,
        updateError,
        message,
    ]);

    return (
        <>
            {loading || commissionLoading || updateLoading ? <Loader /> : <></>}
            <Breadcrumb
                icon="fa fa-pen"
                heading="Update User"
                subheading="You can update user details"
                isButtons={false}
            />
            <div className="dashboard-content">
                <div className="dashboard-global-form">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="form-back-btn">
                                    <Link to="/dashboard/users"><i className="fa fa-angle-left"></i>Back</Link>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="dashboard-global-form-group">
                                        <label>Account Level <span>*</span></label>
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
                                <div className="col-md-4">
                                    <div className="dashboard-global-form-group">
                                        <label>Account Status <span>*</span></label>
                                        <select
                                            name="status"
                                            value={userVal.status}
                                            onChange={(e) => onChnageHandler(e)}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Blocked">Blocked</option>
                                        </select>
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
                            <div className="form-notes">
                                <ul>
                                    <li>Please note that the field containing "*" icon is required!</li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateUser;