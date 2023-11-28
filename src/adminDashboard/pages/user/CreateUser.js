import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../Breadcrumb";
import Loader from "../../../components/loader/Loader";
import { useAlert } from "react-alert";
import { clearError, createUser, resetNew } from "../../../states/actions/userAction"

const CreateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const alert = useAlert();

    const { loading, success, message: successMessage, error } = useSelector(state => state.newUser);

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        phone: "",
        role: "Admin",
        password: "",
    });
    const [adminPasscode, setAdminPasscode] = useState("");

    const onChangeHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const submitHandler = () => {
        if (!userData.username || !userData.password) {
            return alert.error("Username and password is required!");
        }

        if (userData.role === "Admin") {
            dispatch(createUser(userData.username, userData.email, userData.phone, userData.role, userData.status, userData.accountLevel, userData.password));
        }

        if (userData.role === "Super-Admin") {
            if (!adminPasscode) {
                return alert.error("Admin passcode is required");

            }

            dispatch(createUser(userData.username, userData.email, userData.phone, userData.role, userData.status, userData.accountLevel, userData.password, adminPasscode));
        }
    }

    useEffect(() => {
        if (success) {
            alert.success(successMessage);
            dispatch(resetNew());
            navigate("/dashboard/users");
        }

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
    }, [dispatch, navigate, success, successMessage, error, alert]);

    return (
        <>
            {loading ? <Loader /> : <></>}
            <Breadcrumb
                icon="fa fa-plus"
                heading="Add New User"
                subheading="Create new User"
                isButtons={false}
            />
            <div className="dashboard-content">
                <div className="dashboard-global-form">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="form-back-btn">
                                    <Link to="/dashboard/users"><i className="fa fa-angle-left"></i>Back</Link>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="dashboard-global-form-group">
                                        <label>Role <span className="label-alert-message">( Alert!! Please be careful )</span></label>
                                        <select
                                            name="role"
                                            value={userData.role}
                                            onChange={(e) => onChangeHandler(e)}
                                        >
                                            <option value="">Choose Option</option>
                                            <option value="Admin">Admin(Agent)</option>
                                            <option value="Super-Admin">Super-Admin</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="dashboard-global-form-group">
                                        <label>Username <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Enter username"
                                            name="username"
                                            value={userData.username}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="dashboard-global-form-group">
                                        <label>Password <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Enter password"
                                            name="password"
                                            value={userData.password}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                                {
                                    userData.role === "Super-Admin"
                                        ?
                                        <div className="col-md-4">
                                            <div className="dashboard-global-form-group">
                                                <label>Admin Passcode <span>* </span></label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter 4 digit admin passcode"
                                                    name="adminPasscode"
                                                    value={adminPasscode}
                                                    onChange={(e) => setAdminPasscode(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        :
                                        <></>
                                }
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="dashboard-form-action">
                                        <button className="create-btn" onClick={() => submitHandler()}>Create</button>
                                        <button className="cancel-btn">Cancel</button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-notes">
                                <ul>
                                    <li>Please note that the field containing "*" icon is required!</li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateUser;