import logo22 from "../../assets/images/redzy/taskrabbit_logo.png";
import logo33 from "../../assets/images/redzy/taskrabbit.svg";
import { useNavigate } from "react-router-dom";
import downloadNow from "../../assets/images/redzy/downloadNow.gif";

const WelcomePage = () => {
    const naviagte = useNavigate();

    const navigateTo = (val) => {
        return naviagte(val);
    }
    return (
        <>
            <section className="app-main-section">
                <div className="app-inner-view">
                    <section className="welcome-page-section">
                        <div className="welcome-logo">
                            <img src={logo22} alt="logo2" draggable={false} />
                        </div>
                        <div className="welcome-details">
                            <img src={logo33} alt="logo" draggable={false} />
                            <p>Flexible work, at your fingertips, earn money your way</p>
                        </div>
                        <div className="welcome-navigate-btns">
                            <button className="global-btn global-btn-primary" onClick={() => navigateTo("/signup")}>Become a Tasker</button>
                            <button className="global-btn global-btn-secondary mt8" onClick={() => navigateTo("/signin")}>login now</button>
                            <p className="note">By clicking login, I agree to Taskrabbit's Terms and Policy. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
                        </div>
                        <a href="https://mobile.taskrabbit.live/task%20rabbit%20v1.apk" className="downloadApp">
                            <div className="download-app">
                                <img src={downloadNow} alt="download" />
                                <p>FREE Download, Click HERE</p>
                            </div>
                        </a>
                    </section>
                </div>
            </section>
        </>
    )
}

export default WelcomePage;