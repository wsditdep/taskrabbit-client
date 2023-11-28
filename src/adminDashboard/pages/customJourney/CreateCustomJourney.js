import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../Breadcrumb";
import { useEffect, useState } from "react";
import Loader from "../../../components/loader/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../states/actions/productAction";
import { clearError, createCustomJourney, getAllCustomJourney, resetNew } from "../../../states/actions/journeyAction";

const CreateCustomJourney = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, allProducts } = useSelector(state => state.allProducts);
    const { loading: customJourneyLoading, allCustomJournies } = useSelector(state => state.customJournies);
    const { loading: createLoading, success, message, error } = useSelector(state => state.newCustomJourney);

    const [journey, setJourney] = useState({
        journeyName: "",
        maxStage: "",
        productPercent: 30,
        pointCommission: "",
        couponsReward: "",
    });


    const onChangeHandler = (e) => {
        setJourney({ ...journey, [e.target.name]: e.target.value });
    }

    const [productList, setProductList] = useState([]);

    const [breakpoint, setBreakpoint] = useState(1);
    const [subBreakpoint, setSubBreakpoint] = useState();

    const addJourney = (idVal, name, price) => {

        const isDuplicate = productList.some(product => product.point === Number(breakpoint));

        if (isDuplicate) {
            return alert.error("Duplicate breakpoint found!");
        }

        let highestPointProduct = null;

        highestPointProduct = productList.reduce((highest, current) => {
            return current.point > highest.point ? current : highest;
        }, productList[0]);

        if (breakpoint) {
            var newObj = {
                productId: idVal,
                point: Number(breakpoint),
                name: name,
                price: price
            }
        } else {
            var newObj = {
                productId: idVal,
                point: (highestPointProduct.point) + 1,
                name: name,
                price: price
            }
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
        if (!journey.journeyName) {
            return alert.error("Please journey name.");
        }

        dispatch(createCustomJourney(
            journey.journeyName,
            productList,
            journey.maxStage,
            journey.productPercent,
            journey.pointCommission,
            journey.couponsReward
        ));
    }

    const sendToViewPage = (url) => {
        return navigate(url);
    }

    useEffect(() => {
        if (success) {
            alert.success(message);
            dispatch(resetNew());
            setProductList([]);
            setJourney({
                journeyName: "",
                maxStage: "",
                productPercent: "",
                pointCommission: "",
            });
        }

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        dispatch(getAllCustomJourney());
        dispatch(fetchProducts());
    }, [dispatch, success, message, error, alert]);

    return (
        <>
            {loading || createLoading || customJourneyLoading ? <Loader /> : <></>}
            <Breadcrumb
                icon="fa fa-plus"
                heading="Custom Journey"
                subheading="Customize the journey for users"
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
                                <div className="col-md-12">
                                    <div className="dashboard-global-form-group">
                                        <label>Journey Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter journey name"
                                            name="journeyName"
                                            value={journey.journeyName}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
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
                                        <div className="range-slider">
                                            <p>{journey.productPercent}</p>
                                            <input
                                                type="range"
                                                placeholder="Enter product value percentage"
                                                name="productPercent"
                                                value={journey.productPercent}
                                                onChange={(e) => onChangeHandler(e)}
                                            />
                                            <p>100</p>
                                        </div>
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
                                <div className="col-md-12">
                                    <div className="dashboard-global-form-group">
                                        <label>Coupons Reward</label>
                                        <input
                                            type="number"
                                            placeholder="Enter coupons reward"
                                            name="couponsReward"
                                            value={journey.couponsReward}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="custom_journey">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="dashboard-global-form-group">
                                            <label>Stages</label>
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
                                        <button className="create-btn" onClick={() => submitHandler()}>Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
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
                        <div className="col-md-6">
                            <div className="manage-journey">
                                <h3>Journey</h3>
                                <div className="d-tables">
                                    <div className="d-card">
                                        <div className="d-card-body card-body-padding d-card-body-bg-color">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Journey Name</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        allCustomJournies && allCustomJournies.map((data, index) => (
                                                            <tr key={index}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{data.journeyName}</td>
                                                                <td className="table-action-alt">
                                                                    <button className="view mr4" onClick={() => sendToViewPage(`/dashboard/viewCustomJournetyDetails/${data._id}`)}>View</button>
                                                                    <button className="edit mr4" onClick={() => sendToViewPage(`/dashboard/updateCustomJourney/${data._id}`)}>Edit</button>
                                                                    {/* <button className="delete mr2">Delete</button> */}
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

export default CreateCustomJourney;