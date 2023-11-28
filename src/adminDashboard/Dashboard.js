import { Routes, Route } from "react-router-dom";
import "../assets/styles/dashboard.scss";
import ProtectedRoutes from "../components/protectedRoutes/ProtectedRoutes";
import Sidebar from "./dashboardComponents/Sidebar";
import AdminLanding from "./AdminLanding";
import UserIndex from "./pages/user/UserIndex";
import ProductIndex from "./pages/product/ProductIndex";
import CreateProduct from "./pages/product/CreateProduct";
import CreateUser from "./pages/user/CreateUser";
import UserDetails from "./pages/user/UserDetails";
import CommissionIndex from "./pages/commission/CommissionIndex";
import CreateCommission from "./pages/commission/CreateCommission";
import UpdateProduct from "./pages/product/UpdateProduct";
import CreateJourney from "./pages/journey/CreateJourney";
import CreateAccount from "./pages/account/CreateAccount";
import WithdrawalIndex from "./pages/withdrawal/WithdrawalIndex";
import UpdateCommission from "./pages/commission/UpdateCommission";
import UpdateUser from "./pages/user/UpdateUser";
import UserJourney from "./pages/user/UserJourney";
import UpdateJourney from "./pages/journey/UpdateJourney";
import profile from "../assets/images/profile/profile.png";
import { useEffect, useState } from "react";
import CreateCustomJourney from "./pages/customJourney/CreateCustomJourney";
import CustomJourneyDetails from "./pages/customJourney/CustomJourneyDetails";
import UpdateCustomJourney from "./pages/customJourney/UpdateCustomJourney";
import UpdateUserJourney from "./pages/user/UpdateUserJourney";

const Dashboard = () => {

    const [isActiveNav, setIsActiveNav] = useState(false);

    useEffect(() => {
        // Define the GTranslate settings object
        const gTranslateSettings = {
            default_language: 'en',
            languages: ['en', 'zh-CN', 'ru'],
            wrapper_selector: '.gtranslate_wrapper',
            native_language_names: true,
        };

        // Create a new script element for GTranslate widget
        const script = document.createElement('script');
        script.innerHTML = `window.gtranslateSettings = ${JSON.stringify(gTranslateSettings)}`;
        script.src = 'https://cdn.gtranslate.net/widgets/latest/float.js';
        script.defer = true;

        // Append the script element to the document body
        document.body.appendChild(script);

        // Clean up by removing the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <section className="admin-dashboard-section">
                <div className="admin-dashboard-parent">
                    <div className={isActiveNav ? "admin-dashboard-childs activeNav" : "admin-dashboard-childs"}>
                        <Sidebar isActiveNav={isActiveNav} navHandler={setIsActiveNav} />
                    </div>
                    <div className="admin-dashboard-childs">
                        <div className="dashboard-top-navigation">
                            <div className="dashboard-top-navigation-parent">
                                <div className="dashboard-top-navigation-childs">
                                    <div className="top-navigation-btns d-none">
                                        <i className="fa fa-bars" onClick={() => setIsActiveNav(true)}></i>
                                        <div className="navigation-btns-childs">
                                            <button className="d-btn-primary">Mega Menu <i className="fa fa-angle-down"></i></button>
                                        </div>
                                        <div className="navigation-btns-childs">
                                            <button className="d-btn-primary">Dashboard <i className="fa fa-angle-down"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="dashboard-top-navigation-childs">
                                    <div className="dashboard-top-navigation-functions">
                                        <div className="dashboard-top-navigation-functions-childs d-none">
                                            <button><div className="active-animation"></div><i className="fa fa-bell"></i></button>
                                        </div>
                                        <div className="dashboard-top-navigation-functions-childs">
                                            <div className="gtranslate_wrapper"></div>
                                        </div> 
                                        <div className="dashboard-top-navigation-functions-childs d-none">
                                            <button><i className="fa fa-comment-alt"></i></button>
                                        </div>
                                        <div className="dashboard-top-navigation-functions-childs">
                                            <div className="top-profile-image">
                                                <img src={profile} alt="profile" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Routes>
                            <Route element={<ProtectedRoutes isAdmin={true} />}>
                                <Route path="/" element={<AdminLanding />} />
                                <Route path="/users" element={<UserIndex />} />
                                <Route path="/createUser" element={<CreateUser />} />
                                <Route path="/viewUserDetails/:id" element={<UserDetails />} />
                                <Route path="/updateUser/:id" element={<UpdateUser />} />
                                <Route path="/userJourney/:id" element={<UserJourney />} />
                                <Route path="/updateJourney/:id" element={<UpdateJourney />} />
                                <Route path="/updateUserJourney/:id" element={<UpdateUserJourney />} />

                                <Route path="/products" element={<ProductIndex />} />
                                <Route path="/createProduct" element={<CreateProduct />} />
                                <Route path="/updateProduct/:id" element={<UpdateProduct />} />

                                <Route path="/commissions" element={<CommissionIndex />} />
                                <Route path="/createCommission" element={<CreateCommission />} />
                                <Route path="/updateCommission/:id" element={<UpdateCommission />} />

                                <Route path="/createJourney/:id/:username" element={<CreateJourney />} />

                                <Route path="/createPracticeAcc" element={<CreateAccount />} />

                                <Route path="/withdrawals" element={<WithdrawalIndex />} />

                                <Route path="/createCustomJourney" element={<CreateCustomJourney />} />
                                <Route path="/viewCustomJournetyDetails/:id" element={<CustomJourneyDetails />} />
                                <Route path="/updateCustomJourney/:id" element={<UpdateCustomJourney />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard;