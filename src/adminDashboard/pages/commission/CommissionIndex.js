import { useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/loader/Loader";
import moment from "moment";
import { fetchCommission } from "../../../states/actions/commissionAction";

const CommissionIndex = () => {
    const dispatch = useDispatch();

    const { loading, allCommissions } = useSelector(state => state.allCommissions);

    useEffect(() => {
        dispatch(fetchCommission());
    }, [dispatch]);
    return (
        <>
            {loading ? <Loader /> : <></>}
            <Breadcrumb
                icon="fa fa-box"
                heading="Manage Commission"
                subheading="You can manage products"
                isButtons={true}
            />
            <div className="dashboard-content">
                <div className="d-tables">
                    <div className="d-card">
                        <div className="d-card-header d-card-header-bg-color d-card-heading-font card-header-padding">
                            <div className="data-table-parent">
                                <div className="data-table-inner">
                                    <p>COMMISSION LIST</p>
                                    <h3>Commission</h3>
                                </div>
                                <div className="data-table-inner">
                                    <Link to="/dashboard/createCommission"><li>Add Commission <i className="fa fa-angle-right"></i></li></Link>
                                </div>
                            </div>
                        </div>
                        <div className="d-card-body card-body-padding d-card-body-bg-color">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        {/* <th>Updated By</th> */}
                                        <th>Level</th>
                                        <th>Commission Value</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allCommissions && allCommissions.map((data, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                {/* <td>{data.updatedBy}</td> */}
                                                <td>{data.level}</td>
                                                <td>{data.commissionValue}</td>
                                                <td>{moment(data.createdAt).format("Do MMM YYYY")}</td>
                                                <td className="table-action">
                                                    <ul>
                                                        <Link to={`/dashboard/updateCommission/${data._id}`}>
                                                            <li><i className="fa fa-pen"></i></li>
                                                        </Link>
                                                    </ul>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="table-pagination">
                                <div className="pagination-childs"></div>
                                <div className="pagination-childs">
                                    <div className="show-pagination-page">
                                        <p>1-5 of 100</p>
                                    </div>
                                    <div className="show-pagination-page">
                                        <li><i className="fa fa-angle-left"></i></li>
                                        <li><i className="fa fa-angle-right"></i></li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommissionIndex;