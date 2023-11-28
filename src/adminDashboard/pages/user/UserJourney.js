import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { clearError, getUserJourneyById, resetDetails, resetJourney, resetNew } from "../../../states/actions/journeyAction";
import Loader from "../../../components/loader/Loader";
import { useAlert } from "react-alert";

const UserJourney = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const alert = useAlert();

    const { loading, userJourneyById } = useSelector(state => state.userJourneyById);

    const { loading: cancelLoading, error, success, message } = useSelector(state => state.cancelJourney);

    const resetJourneyHandler = (type) => {
        return dispatch(resetJourney(userJourneyById?.currentJourney?._id, type));
    }

    const sendToBack = () => {
        return navigate("/dashboard/users");
    }
    useEffect(() => {
        dispatch(getUserJourneyById(id));

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (success) {
            alert.success(message);
            dispatch(resetDetails());
        }

    }, [
        dispatch,
        id,
        error,
        success,
        alert
    ]);
    return (
        <>
            {loading || cancelLoading ? <Loader /> : <></>}
            <Breadcrumb
                icon="fa fa-users"
                heading="Users Journey"
                subheading="You can see user journey"
                isButtons={false}
            />
            <div className="user-journey-wrapper">
                <div className="container-fluid">
                    <div className="row break-journey">
                        <div className="col-md-4">
                            <div className="show-user-journey-user-details">
                                <p>User Details</p>
                                <h3>Username: <span>{userJourneyById?.username}</span></h3>
                            </div>

                            <div className="show-user-journey-user-details">
                                <p>Agent Details</p>
                                <h3>Username: <span>{userJourneyById?.adminRef?.username}</span></h3>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="journey-status">
                                <h3>Current Stage: {userJourneyById?.currentJourney?.currentStage} | Max Stages: {userJourneyById?.currentJourney?.maxStagesNumber} | Journey Status: {userJourneyById?.currentJourney?.status}</h3>
                            </div>
                            <div className="reset-journey-btn">
                                <button onClick={() => resetJourneyHandler("cancel")}>Cancel Journey</button>
                            </div>
                            <div className="reset-journey-btn dmt-sm-1">
                                <button onClick={() => resetJourneyHandler("reset")}>Reset Journey</button>
                            </div>
                            <div className="reset-journey-btn back">
                                <button onClick={() => sendToBack()}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserJourney;