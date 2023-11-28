import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Breadcrumb from "../../Breadcrumb";
import Loader from "../../../components/loader/Loader";
import moment from "moment";
import Conformation from "../../../components/conformation/Conformation";
import { deleteProduct, fetchProducts, resetDelete } from "../../../states/actions/productAction";

const ProductIndex = () => {
    const dispatch = useDispatch();

    const { allProducts, loading } = useSelector(state => state.allProducts);
    const { isDeleted, message: deleteMessage, loading: deleteLoading } = useSelector(state => state.product);

    const alert = useAlert();

    const [confirmBox, setConfirmBox] = useState(false);
    const [cid, setCid] = useState(null);

    const proceedToConformation = (id) => {
        setCid(id);
        setConfirmBox(true);
    }

    const proceedToDelete = () => {
        setConfirmBox(false);
        return dispatch(deleteProduct(cid));
    }

    useEffect(() => {

        if (isDeleted) {
            alert.success(deleteMessage);
            dispatch(resetDelete());
        }

        dispatch(fetchProducts());
    }, [
        dispatch,
        alert,
        isDeleted,
        deleteMessage,
    ]);

    return (
        <>
            {loading || deleteLoading ? <Loader /> : <></>}
            <Breadcrumb
                icon="fa fa-box"
                heading="Manage Products"
                subheading="You can manage products"
                isButtons={true}
            />
            {
                confirmBox
                    ?
                    <Conformation setConfirmBox={setConfirmBox} proceedFurther={proceedToDelete} message="Hy...Do you want to delete this Product?" btnName="DELETE" />
                    :
                    <></>
            }
            <div className="dashboard-content white-space-normal">
                <div className="d-tables">
                    <div className="d-card">
                        <div className="d-card-header d-card-header-bg-color d-card-heading-font card-header-padding">
                            <div className="data-table-parent">
                                <div className="data-table-inner">
                                    <p>PRODUCT LIST</p>
                                    <h3>Products</h3>
                                </div>
                                <div className="data-table-inner">
                                    <Link to="/dashboard/createProduct"><li>Add Product <i className="fa fa-angle-right"></i></li></Link>
                                </div>
                            </div>
                        </div>
                        <div className="d-card-body card-body-padding d-card-body-bg-color">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Store Name</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allProducts && allProducts.map((data, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td className="table-image">
                                                    <img src={process.env.REACT_APP_API_URL + "/public/" + data.imageUrl} alt="product" />
                                                </td>
                                                <td>{data.name}</td>
                                                <td>{data.price}</td>
                                                <td>{data.storeName}</td>
                                                <td>{moment(data && data.createdAt).format("Do MMM YYYY")}</td>
                                                <td className="table-action">
                                                    <ul>
                                                        <Link to={`/dashboard/updateProduct/${data._id}`}>
                                                            <li><i className="fa fa-pen"></i></li>
                                                        </Link>
                                                        <button onClick={() => proceedToConformation(data._id)}>
                                                            <li className="delete"><i className="fa fa-trash-alt"></i></li>
                                                        </button>
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

export default ProductIndex;