import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../../Breadcrumb";
import Loader from "../../../components/loader/Loader";
import { useAlert } from "react-alert";
import { clearError, createJourney, resetNew } from "../../../states/actions/journeyAction";
import { fetchProducts } from "../../../states/actions/productAction";

const UpdateJourney = () => {
    const dispatch = useDispatch()
    const alert = useAlert();

    const { loading, allProducts } = useSelector(state => state.allProducts);
    const { loading: createLoading, success, message, error } = useSelector(state => state.newJourney);

    const [journeyVal, setJourneyVal] = useState({
        userId: "",
        maxStagesNumber: "",
        productId: "",
        point: ""
    });

    const [productList, setProductList] = useState([]);

    const onChangeHandler = (e) => {
        setJourneyVal({ ...journeyVal, [e.target.name]: e.target.value });
    }

    const addJourney = (idVal, name, price) => {
        if (!journeyVal.point) {
            return alert.error("Please enter break points!");
        }

        const newObj = {
            productId: idVal,
            point: journeyVal.point,
            name: name,
            price: price
        }

        setJourneyVal({ ...journeyVal, productId: idVal, });
        setProductList([...productList, newObj]); 
    }

    const removeProduct = (removeID) => {
        const updatedList = productList.filter(product => product.productId !== removeID);
        setProductList(updatedList);
    }

    const submitHandler = () => {
        if (!journeyVal.userId) {
            return alert.error("Please enter UserId");
        }

        if (productList.length === 0) {
            return alert.error("Please select the products");
        }

        dispatch(createJourney(journeyVal.userId, journeyVal.maxStagesNumber, productList));

    }

    useEffect(() => {
        if (success) {
            setProductList([]);
            setJourneyVal({
                userId: "",
                maxStagesNumber: "",
                productId: "",
                point: ""
            });
            alert.success(message);
            dispatch(resetNew());
        }

        if(error) {
            alert.error(error);
            dispatch(clearError());
        }

        dispatch(fetchProducts());
    }, [dispatch, success, message, alert, error]);

    return (
        <>
            {loading || createLoading ? <Loader /> : <></>}
            <Breadcrumb
                icon="fa fa-pen"
                heading="Edit Journey"
                subheading="Update journey for user"
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
                                <div className="col-md-6">
                                    <div className="dashboard-global-form-group">
                                        <label>UserID <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Enter User ID"
                                            name="userId"
                                            value={journeyVal.userId}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="dashboard-global-form-group">
                                        <label>Max Stage Number <span>*</span></label>
                                        <input
                                            type="number"
                                            placeholder="Enter commission value"
                                            name="maxStagesNumber"
                                            value={journeyVal.maxStagesNumber}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="dashboard-global-form-group">
                                        <label>Product ID <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Enter Product ID"
                                            name="productId"
                                            value={journeyVal.productId}
                                            onChange={(e) => onChangeHandler(e)}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="dashboard-global-form-group">
                                        <label>Point  <span>*</span></label>
                                        <input
                                            type="number"
                                            placeholder="Enter Points"
                                            name="point"
                                            value={journeyVal.point}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {
                                    productList.length === 0
                                        ?
                                        <>
                                            <div className="no_journey">
                                                <h3>There is no product for journey, Please add product to proceed!</h3>
                                            </div>
                                        </>
                                        :
                                        productList.map((data, index) => (
                                            <div className="col-md-4" key={index}>
                                                <div className="show-listed-journey">
                                                    <h3><span>Product ID:</span>{data.productId}</h3>
                                                    <h3><span>Point:</span>{data.point}</h3>
                                                    <h3><span>Product Name:</span>{data.name}</h3>
                                                    <h3><span>Product Price:</span>{data.price}</h3>
                                                    <div className="show-listed-journey-remove-btn">
                                                        <button onClick={() => removeProduct(data.productId)}><i className="fa fa-times"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
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
                        </div>
                    </form>
                </div>
                <div className="manage-jourley">
                    <div className="d-tables">
                        <div className="d-card">
                            <div className="d-card-body card-body-padding d-card-body-bg-color">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Store Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allProducts && allProducts.map((data, index) => (
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{data.name}</td>
                                                    <td>{data.price}</td>
                                                    <td>{data.storeName}</td>
                                                    <td className="table-action">
                                                        <ul>
                                                            <button>
                                                                <li className="delete" onClick={() => addJourney(data._id, data.name, data.price)}><i className="fa fa-check"></i></li>
                                                            </button>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateJourney;