import { Link } from "react-router-dom";
import { logout } from "../../states/actions/userAction";
import { useDispatch } from "react-redux";

const MobileBreadcrumb = ({ isLogout, name, nav, color }) => {
    const dispatch = useDispatch();

    const logOutUser = () => {
        dispatch(logout());
    }

    return (
        <div className="section-breadcrumb">
            <div className="childs">
                <Link to={`${nav}`}>
                    <i className="fa fa-angle-left" style={{ color }}></i>
                </Link>
            </div>
            <div className="childs">
                <h3 style={{ color }}>{name}</h3>
            </div>
            <div className="childs">
                {
                    isLogout
                        ?
                        <div className="logout-btn" onClick={() => logOutUser()}>
                            <i className="fa fa-sign-in-alt" style={{ color }}></i>
                        </div>
                        :
                        <></>
                }
            </div>
        </div>
    )
}

export default MobileBreadcrumb;