import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../Breadcrumb";
import Loader from "../../../components/loader/Loader";
import moment from "moment";
import { useAlert } from "react-alert";
import { clearError, createJourney, getAllCustomJourney, resetNew } from "../../../states/actions/journeyAction";

const CreateJourney = () => {
    const dispatch = useDispatch()
    const alert = useAlert();
    const { id, username } = useParams();
    const navigate = useNavigate();

    const { loading, allCustomJournies } = useSelector(state => state.customJournies);
    const { loading: createLoading, success, message, error } = useSelector(state => state.newJourney);

    const [journeyVal, setJourneyVal] = useState({
        userId: "",
        breakPoints: [],
        maxStagesNumber: "",
        productValPerc: ""
    });

    const [jor, setJor] = useState([]);

    const addJourney = (data) => {
        setJourneyVal({
            userId: id,
            breakPoints: data.breakPoints,
            maxStagesNumber: data.maxStagesNumber,
            productValPerc: data.productValue
        });

        setJor([data]);
    }

    const submitHandler = () => {

        if (jor.length === 0) {
            return alert.error("Please choose journey!");
        }

        dispatch(createJourney(journeyVal.userId, journeyVal.maxStagesNumber, journeyVal.breakPoints, journeyVal.productValPerc));

    }

    const closeWindow = () => {
        return navigate("/dashboard/users");
    }

    useEffect(() => {
        if (success) {
            alert.success(message);
            dispatch(resetNew());
            navigate("/dashboard/users");
        }

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        dispatch(getAllCustomJourney());
    }, [dispatch, success, message, alert, error, navigate]);

    return (
        <>
            {loading || createLoading ? <Loader /> : <></>}
            <Breadcrumb
                icon="fa fa-plus"
                heading="Add Journey"
                subheading="Create journey for users"
                isButtons={false}
            />
            {
                id === "null"
                    ?
                    <></>
                    :
                    <div className="opoup_overlay" onClick={()=> closeWindow()}></div>

            }
            <div className={id === "null" ? "dashboard-content" : "dashboard-content pop-up-box journey-pop"}>
                <div className="dashboard-global-form">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="form-back-btn">
                                    <Link to="/dashboard/users"><i className="fa fa-angle-left"></i>Back</Link>
                                </div>
                            </div>
                            <h4>Set journey for {`'${username}'`}</h4>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="dashboard-global-form-group">
                                        <label>User Id <span>*</span></label>
                                        <input
                                            type="text"
                                            value={id}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="dashboard-global-form-group">
                                        <label>Username <span>*</span></label>
                                        <input
                                            type="text"
                                            value={username}
                                            readOnly
                                        />
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
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="dashboard-form-action">
                                        <button className="create-btn" onClick={() => submitHandler()}>Set Journey</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
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
        </>
    )
}

export default CreateJourney;