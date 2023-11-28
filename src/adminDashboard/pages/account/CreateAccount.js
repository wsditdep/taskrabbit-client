import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import Breadcrumb from "../../Breadcrumb";
import moment from "moment";
import { clearError, createPracticeAccount, resetNew } from "../../../states/actions/userAction";
import { createJourney, getAllCustomJourney } from "../../../states/actions/journeyAction";

const CreateAccount = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success, message, account } = useSelector(state => state.practiceAccount);
    const { loading: customJourneyLoading, allCustomJournies } = useSelector(state => state.customJournies);

    const [accVal, setAccVal] = useState({
        username: "",
        password: "",
        cpassword: "",
        mainAccount: ""
    });

    const [journeyVal, setJourneyVal] = useState({
        userId: "",
        breakPoints: [],
        maxStagesNumber: "",
        productValPerc: ""
    });

    const onChangeHandler = (e) => {
        setAccVal({ ...accVal, [e.target.name]: e.target.value });
    }

    const submitHandler =  () => {
        if (!accVal.username || !accVal.password || !accVal.cpassword || !accVal.mainAccount) {
            return alert.error("Required field is missing!");
        }

        if (accVal.password !== accVal.cpassword) {
            return alert.error("Password is not matching!");
        }

        if (jor.length === 0) {
            return alert.error("Please choose journey!");
        }

        dispatch(createPracticeAccount(accVal.username, accVal.mainAccount, accVal.password));
    }

    const [jor, setJor] = useState([]);

    const addJourney = (data) => {
        setJourneyVal({
            userId: 21,
            breakPoints: data.breakPoints,
            maxStagesNumber: data.maxStagesNumber,
            productValPerc: data.productValue
        });

        setJor([data]);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (success) {
            alert.success(message);
            // console.log("yap", account?._id);

            dispatch(createJourney(journeyVal.userId, journeyVal.maxStagesNumber, journeyVal.breakPoints, journeyVal.productValPerc))

            dispatch(resetNew());
            navigate("/dashboard/users");
        }

        dispatch(getAllCustomJourney());
    }, [
        dispatch,
        navigate,
        alert,
        error,
        success,
        message
    ]);
    return (
        <>
            {loading || customJourneyLoading ? <Loader /> : <></>}
            <Breadcrumb
                icon="fa fa-plus"
                heading="Create Practice Account"
                subheading="Create practice account"
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
                                        <label>Username <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Enter product name"
                                            name="username"
                                            value={accVal.username}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="dashboard-global-form-group">
                                        <label>Ref Code <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Enter ref code"
                                            name="mainAccount"
                                            value={accVal.mainAccount}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="dashboard-global-form-group">
                                        <label>Password <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Enter your password"
                                            name="password"
                                            value={accVal.password}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="dashboard-global-form-group">
                                        <label>Confirm Password <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Enter your password again"
                                            name="cpassword"
                                            value={accVal.cpassword}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="dashboard-form-action">
                                        <button className="create-btn" onClick={() => submitHandler()}>Create Account</button>
                                    </div>
                                </div>
                            </div>
                            {
                                jor.length !== 0
                                    ?
                                    <div className="row">
                                        <div className="show-custom-journey">
                                            <p>Name: {jor[0].journeyName}</p> | <p>Max Stages: {jor[0].maxStagesNumber}</p> | <p>Available Products: {jor[0].breakPoints.length}</p>
                                            <button onClick={() => setJor([])}>Cancel</button>
                                        </div>
                                    </div>
                                    :
                                    <></>
                            }
                            <div className="form-notes">
                                <ul>
                                    <li>Please note that the field containing "*" icon is required!</li>
                                </ul>
                            </div>
                            <div className="manage-journey">
                                <h3>Journey Preset</h3>
                                <div className="d-tables">
                                    <div className="d-card">
                                        <div className="d-card-body card-body-padding d-card-body-bg-color">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Max Stages</th>
                                                        <th>Breakpoints</th>
                                                        <th>Prices</th>
                                                        <th>Created At</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        allCustomJournies && allCustomJournies.map((data, index) => (
                                                            <tr>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{data.journeyName}</td>
                                                                <td>{data.maxStagesNumber}</td>
                                                                <td>
                                                                    {
                                                                        data?.breakPoints.map((item, index) => (
                                                                            <span key={index}>{item.point},</span>
                                                                        ))
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        data?.breakPoints.map((item, index) => (
                                                                            <span key={index}>{item.productId?.price},</span>
                                                                        ))
                                                                    }
                                                                </td>
                                                                <td>{moment(data.createdAt).format("Do MMM YYYY")}</td>
                                                                <td className="table-action assign-btn">
                                                                    <ul>
                                                                        <li className="delete" onClick={() => addJourney(data)}>Assign</li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
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

export default CreateAccount;