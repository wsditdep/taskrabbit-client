import { useParams } from "react-router-dom";
import MobileBreadcrumb from "../../mobileComponents/MobileBreadcrumb";
import { useEffect } from "react";
import { getNotificationByID } from "../../../states/actions/notificationAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/loader/Loader";

const Rules = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { loading, notification } = useSelector(state => state.notification);

    useEffect(() => {
        dispatch(getNotificationByID(id));
    }, [
        id
    ]);
    return (
        <>
            {loading ? <Loader /> : <></>}
            <section className="rules-section mobile-section-padding background_texture">
                <MobileBreadcrumb name={notification?.parameterName} nav="/userDashboard/userProfile" isLogout={false} />
                <div className="document-page">
                    <div dangerouslySetInnerHTML={{ __html: notification?.value }}></div>
                </div>
            </section>
        </>
    )
}

export default Rules;