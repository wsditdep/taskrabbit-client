import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../../states/actions/productAction";
import Loader from "../../../components/loader/Loader";
import { clearError, fetchUserJourneyById, resetDetails, resetUpdate, updateUserJourney } from "../../../states/actions/journeyAction";

const UpdateUserJourney = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    const navigate = useNavigate();

    const { loading: updateLoading, isUpdated, error, message } = useSelector(state => state.userJourneyy);
    const { loading, allProducts } = useSelector(state => state.allProducts);
    const { loading: detailsLoading, getUserJourneyByID: journeyDetail } = useSelector(state => state.userJourneyDetailsByID);
    const productArray = journeyDetail?.breakPoints;

    const [journey, setJourney] = useState({
        maxStage: "",
        productPercent: "",
        pointCommission: ""
    });

    const onChangeHandler = (e) => {
        setJourney({ ...journey, [e.target.name]: e.target.value });
    }

    const [productList, setProductList] = useState([]);

    const [breakpoint, setBreakpoint] = useState();
    const [subBreakpoint, setSubBreakpoint] = useState();

    const addJourney = (idVal, name, price) => {

        if (!breakpoint) {
            return alert.error("Please enter break points!");
        }

        const newObj = {
            productId: idVal,
            point: Number(breakpoint),
            name: name,
            price: price
        }

        setBreakpoint("");
        setProductList([...productList, newObj]);
    }

    const removeProduct = (removeID) => {
        const updatedList = productList.filter(product => product.productId !== removeID);
        setProductList(updatedList);
    }

    const updateBreakpoint = (id) => {
        if (!subBreakpoint) {
            return alert.error("For update enter breakpoint!");
        }

        const isDuplicate = productList.some(product => product.point === Number(subBreakpoint));

        if (isDuplicate) {
            return alert.error("Duplicate breakpoint found!");
        }

        const updatedList = productList.map(product => {
            if (product.productId === id) {
                return {
                    productId: product.productId,
                    point: Number(subBreakpoint),
                    name: product.name,
                    price: product.price
                };
            }
            return product;
        });

        setProductList(updatedList);
        setSubBreakpoint();
        return alert.success("Breakpoint replace!");
    }

    const submitHandler = () => {
        if (!journey.maxStage) {
            return alert.error("Enter the max stage!");
        }

        // journeyId, userId, breakPoints, maxStagesNumber, productValPerc, pointsCommission
        dispatch(updateUserJourney(id, journeyDetail?.userId?._id, productList, journey.maxStage, journey.productPercent, journey.pointCommission));
    }

    const manageproductArray = () => {
        const modifiedArray = productArray.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            point: item.point
        }))
        setProductList(modifiedArray);
    }

    useEffect(() => {
        if (journeyDetail && journeyDetail._id !== id) {
            dispatch(fetchUserJourneyById(id))
        } else {
            setJourney({
                maxStage: journeyDetail.maxStagesNumber,
                productPercent: journeyDetail.productValue,
                pointCommission: journeyDetail.pointsCommission,
            });
            manageproductArray();
        }

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (isUpdated) {
            alert.success(message);
            dispatch(resetUpdate())
            dispatch(resetDetails())
            navigate("/dashboard/users");
        }

        dispatch(fetchProducts());
    }, [
        dispatch,
        navigate,
        id,
        journeyDetail,
        alert,
        error,
        isUpdated,
        message
    ]);
    return (
        <>
            {loading || detailsLoading || updateLoading ? <Loader /> : <></>}
            <div className="dashboard-content">
                <div className="dashboard-global-form">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="form-back-btn">
                                    <Link to="/dashboard/createCustomJourney"><i className="fa fa-angle-left"></i>Back</Link>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="dashboard-global-form-group">
                                        <label>Max Stages Number</label>
                                        <input
                                            type="number"
                                            placeholder="Enter maximun stages"
                                            name="maxStage"
                                            value={journey.maxStage}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="dashboard-global-form-group">
                                        <label>Product Percentage</label>
                                        <input
                                            type="number"
                                            placeholder="Enter product value percentage"
                                            name="productPercent"
                                            value={journey.productPercent}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="dashboard-global-form-group">
                                        <label>Point Commission</label>
                                        <input
                                            type="number"
                                            placeholder="Enter point commission"
                                            name="pointCommission"
                                            value={journey.pointCommission}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="custom_journey">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="dashboard-global-form-group">
                                            <label>Product breakpoints</label>
                                            <input
                                                type="number"
                                                placeholder="Enter product breakpoints"
                                                name="breakpoint"
                                                value={breakpoint}
                                                onChange={(e) => setBreakpoint(e.target.value)}
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
                                                        <div className="update-breakpoint">
                                                            <input
                                                                type="number"
                                                                name="subBreakpoint"
                                                                onChange={(e) => setSubBreakpoint(e.target.value)}
                                                            />
                                                            <button onClick={() => updateBreakpoint(data.productId)}>SET</button>
                                                        </div>
                                                        <div className="show-listed-journey-remove-btn">
                                                            <button onClick={() => removeProduct(data.productId)}><i className="fa fa-times"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="dashboard-form-action">
                                        <button className="create-btn" onClick={() => submitHandler()}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="manage-journey">
                                <h3>Available Products</h3>
                                <div className="d-tables">
                                    <div className="d-card">
                                        <div className="d-card-body card-body-padding d-card-body-bg-color">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        allProducts && allProducts.map((data, index) => (
                                                            <tr key={index}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{data.name}</td>
                                                                <td>{data.price}</td>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateUserJourney;