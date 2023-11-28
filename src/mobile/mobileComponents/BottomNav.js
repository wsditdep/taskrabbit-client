import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/redzy/taskrabbit_logo.png";

const BottomNav = () => {
    const navigate = useNavigate();

    const sendTo = (val) => {
        return navigate(val);
    }

    return(
        <>
            <div className="bottom_nav">
                <div className="bottom_nav_childs" onClick={() => sendTo("/userDashboard/home")}>
                    <i className="fa fa-home"></i>
                </div>
                <div className="bottom_nav_childs" onClick={() => sendTo("/userDashboard/history")}>
                    <i className="fa fa-suitcase"></i>
                </div>
                <div className="bottom_nav_childs">
                   <div className="bottom_nav_logo" onClick={() => sendTo("/userDashboard/userJourney")}>
                        <img src={logo} alt="logo2" draggable={false} />
                   </div>
                </div>
                <div className="bottom_nav_childs" onClick={() => sendTo("/userDashboard/withdrawal")}>
                    <i className="fa fa-wallet"></i>
                </div>
                <div className="bottom_nav_childs" onClick={() => sendTo("/userDashboard/setting")}>
                    <i className="fa fa-cog"></i>
                </div>
            </div>
        </>
    )
}

export default BottomNav;                          