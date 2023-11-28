import BottomNav from "../mobileComponents/BottomNav";
import MobileBreadcrumb from "../mobileComponents/MobileBreadcrumb";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import submit_click from "../../assets/images/redzy/submit_click.gif";
import { clearError, resetDetails, submitJourney } from "../../states/actions/journeyAction";
import { useAlert } from "react-alert";

const StartJourney = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, userPlacedJourney, error: placeOrderError, success: placeOrderSuccess } = useSelector(state => state.userPlacedOrder);
    const { loading: submitLoading, error, success, message: successMessage } = useSelector(state => state.userSubmitOrder);

    const submitHandler = () => {
        return dispatch(submitJourney());
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (placeOrderError) {
            alert.error(placeOrderError);
            dispatch(clearError());
        }

        if (success) {
            alert.success(successMessage);
            dispatch(resetDetails());
            navigate("/userDashboard/userJourney");
        }


    }, [
        navigate,
        dispatch,
        success,
        placeOrderError,
        alert,
        successMessage,
        error,
        placeOrderSuccess
    ]);

    return (
        <>
            {loading || submitLoading}
            <section className="start-journey-section">
                <div className="backgroundImg">
                    <MobileBreadcrumb name="Assigning Job" nav="/userDashboard/userProfile" isLogout={false} color={'#fff'} />
                    <div className="start-joueny-header">
                        <h1>We found you a job</h1>
                        <h4>{userPlacedJourney?.product?.name}</h4>
                    </div>
                    <div className="journey">
                        <div className="journey-info">
                            <div className="card1">
                                <span>
                                    <i class="fa fa-tag"></i>
                                    <span>Price</span>
                                </span>
                                <h3>
                                    $ {userPlacedJourney?.product?.price?.toFixed(2)}
                                </h3>
                            </div>
                            <div className="card2">
                                <span>
                                    <i class="fa fa-cash-register"></i>
                                    <span>Commission</span>
                                </span>
                                <h3>
                                    $ {userPlacedJourney?.commission}
                                </h3>
                            </div>
                            <div className="card3">
                                <span>
                                    <i class="fa fa-award"></i>
                                    <span>Total</span>
                                </span>
                                <h3>
                                    $ {(Number(userPlacedJourney?.product?.price) + Number(userPlacedJourney?.commission)).toFixed(2)}
                                </h3>
                            </div>
                        </div>
                        <div className="journeyImg">
                            <img src={process.env.REACT_APP_API_URL + "/public/" + userPlacedJourney?.product?.imageUrl} alt="product" />
                        </div>
                    </div>
                    <button
                        onClick={() => submitHandler()}
                        disabled={loading || submitLoading}
                    >
                        <img src={submit_click} alt="gif" />
                    </button>
                    <h3>Click Here <i className="fa fa-angle-up"></i></h3>
                </div>

            </section>
            <BottomNav />
        </>
    )
}

export default StartJourney;