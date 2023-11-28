import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../Breadcrumb";
import { useAlert } from "react-alert";
import Loader from "../../../components/loader/Loader";
import prev from "../../../assets/images/vectors/noPrev.jpg";
import { clearError, createProduct, resetNew } from "../../../states/actions/productAction";

const CreateProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const alert = useAlert();

    const { loading, success, message: successMessage, error } = useSelector(state => state.newProduct);

    const [productData, setproductData] = useState({
        name: "",
        price: "",
        storeName: ""
    });

    const [file, setFile] = useState(null);

    const onChangeHandler = (e) => {
        setproductData({ ...productData, [e.target.name]: e.target.value });
    }

    const submitHandler = () => {
        if (!productData.name || !productData.price || !productData.storeName) {
            return alert.error("Required field is missing, please try again!");
        }

        if (file === null) {
            return alert.error("Please choose the image!");
        }

        if ((file.size / 1024) >= 500) {
            return alert.error("File size should be less than 500KB");
        }

        const myForm = new FormData()

        myForm.append("name", productData.name);
        myForm.append("price", productData.price);
        myForm.append("storeName", productData.storeName);
        myForm.append("productImage", file);
        
        dispatch(createProduct(myForm));

    }

    useEffect(() => {
        if (success) {
            alert.success(successMessage);
            dispatch(resetNew());
            navigate("/dashboard/products");
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
                heading="Add New Product"
                subheading="Create new product"
                isButtons={false}
            />
            <div className="dashboard-content">
                <div className="dashboard-global-form">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="form-back-btn">
                                    <Link to="/dashboard/products"><i className="fa fa-angle-left"></i>Back</Link>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="dashboard-global-form-group">
                                        <label>Product Name <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Enter product name"
                                            name="name"
                                            value={productData.name}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="dashboard-global-form-group">
                                        <label>Price <span>*</span></label>
                                        <input
                                            type="number"
                                            placeholder="Enter product price"
                                            name="price"
                                            value={productData.price}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="dashboard-global-form-group">
                                        <label>Store Name <span>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Enter store name"
                                            name="storeName"
                                            value={productData.storeName}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="dashboard-global-form-group">
                                        <label>Choose File <span>*</span></label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                        {
                                            file && file
                                                ?
                                                <div className="dashboard-image-prev">
                                                    <div className="dashboard-img">
                                                        <img src={URL.createObjectURL(file)} alt="prev" draggable={false} />
                                                        <div className="prev-remove-btn">
                                                            <button onClick={() => setFile(null)}> <i className="fa fa-times"></i> </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div className="dashboard-image-prev">
                                                    <div className="dashboard-img">
                                                        <img src={prev} alt="prev" draggable={false} />
                                                    </div>
                                                </div>
                                        }
                                    </div>
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
            </div>
        </>
    )
}

export default CreateProduct;