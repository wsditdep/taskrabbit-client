import "../assets/styles/mobile.scss";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./mobilePages/UserProfile";
import UserJourney from "./mobilePages/UserJourney";
import UserStart from "./mobilePages/startingPage";
import UserHome from "./mobilePages/homePage";
import UserWithdrawal from "./mobilePages/withdrawalPage";
import UserHistory from "./mobilePages/history";
import UserSetting from "./mobilePages/setting";
import StartJourney from "./mobilePages/startJourney";
import Rules from "./mobilePages/staticPages/Rules";
import WithdrawalHistory from "./mobilePages/withdrawalHistory";

const UserLanding = () => {
    return (
        <>
            <section className="app-main-section">
                <div className="app-inner-view">
                    <Routes>
                        <Route path="/userProfile" element={<UserProfile />} exact />
                        <Route path="/userJourney" element={<UserJourney />} exact />
                        <Route path="/start" element={<UserStart />} exact />
                        <Route path="/home" element={<UserHome />} exact />
                        <Route path="/withdrawal" element={<UserWithdrawal />} exact />
                        <Route path="/history" element={<UserHistory />} exact />
                        <Route path="/setting" element={<UserSetting />} exact />
                        <Route path="/journey/start-journey" element={<StartJourney />} exact />

                        <Route path="/rules/:id" element={<Rules />} exact />
                        <Route path="/withdrawalHistory" element={<WithdrawalHistory />} exact />
                    </Routes>
                </div>
            </section>
        </>
    )
}

export default UserLanding;