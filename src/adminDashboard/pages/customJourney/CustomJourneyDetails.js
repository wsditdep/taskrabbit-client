import { useEffect } from "react";
import Breadcrumb from "../../Breadcrumb";
import { getCustomJourneyById, resetDetails } from "../../../states/actions/journeyAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import moment from "moment";
import Loader from "../../../components/loader/Loader";

const CustomJourneyDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, getCustomJourneyById: journey, error } = useSelector(state => state.customJourneyById);

    const backBtn = () => {
        dispatch(resetDetails());
        return navigate("/dashboard/createCustomJourney");
    }

    useEffect(() => {
        dispatch(getCustomJourneyById(id));

        if (error) {
            alert.error(error);
        }
    }, [dispatch, error, alert, id]);
    return (
        <>
            {loading ? <Loader /> : <></>}
            <Breadcrumb
                icon="fa fa-clipboard"
                heading="Custom Journey Details"
                subheading="Details"
                isButtons={false}
            />
            <div className="dashboard-content">
                <div className="dashboard-global-form">
                    <div className="show-custom-journey-details">
                        <div className="show-custom-journey-childs">
                            <h1>Journey Name: <span>{journey?.journeyName}</span></h1>
                            <h1>Max Stages Number: <span>{journey?.maxStagesNumber}</span></h1>
                            <h1>Product Value: <span>{journey?.productValue}</span></h1>
                            <h1>Product Value: <span>{journey?.productValue}</span></h1>
                            <h1>Commission Point: <span>{journey?.pointsCommission}</span></h1>
                            <h1>Created At: <span>{moment(journey && journey.createdAt).format("Do MMM YYYY")}</span></h1>
                            <h1>Updated At: <span>{moment(journey && journey.updatedAt).format("Do MMM YYYY")}</span></h1>
                            <div className="back-btn-alt">
                                <button onClick={() => backBtn()}><i className="fa fa-angle-left"></i> Back</button>
                            </div>
                        </div>
                        <div className="show-custom-journey-childs">
                            <div className="container-fluid">
                                <div className="row">
                                    {
                                        journey && journey.breakPoints && journey.breakPoints.map((data, index) => (
                                            <div className="col-md-4">
                                                <div className="show-listed-journey">
                                                    <h3><span>Point:</span>{data?.point}</h3>
                                                    <h3><span>Product Name:</span>{data?.productId?.name}</h3>
                                                    <h3><span>Product Price:</span>${data?.productId?.price}</h3>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomJourneyDetails;