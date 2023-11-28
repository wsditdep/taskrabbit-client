import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Breadcrumb from "../../Breadcrumb";
import Loader from "../../../components/loader/Loader";
import { clearError, fetchProductDetails, resetDetails, resetUpdate, updateProduct } from "../../../states/actions/productAction";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();

    const { loading, error: fetchError, product } = useSelector(state => state.productDetails);
    const { loading: updateLoading, isUpdated, error: updateError } = useSelector(state => state.product);

    const [productData, setProductData] = useState({
        name: "",
        price: "",
        storeName: ""
    });
    const [file, setFile] = useState(null);
    const [oldFile, setOldFile] = useState(null);

    const onChangeHandler = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    }

    const submitHandler = () => {
        if (!productData.name || !productData.price || !productData.storeName) {
            return alert.error("Required field is missing, please try again!");
        }

        if (file && (file.size / 1024) >= 500) {
            return alert.error("File size should be less than 500KB");
        }

        const myForm = new FormData()

        myForm.append("name", productData.name);
        myForm.append("price", productData.price);
        myForm.append("storeName", productData.storeName);
        myForm.append("productId", id);
        myForm.append("productImage", file);
        
        dispatch(updateProduct(myForm));

    }

    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(fetchProductDetails(id));
        } else {
            setProductData({
                name: product.name,
                price: product.price,
                storeName: product.storeName
            });
            setOldFile(product.imageUrl);
        }

        if (fetchError) {
            alert.error(fetchError);
            dispatch(clearError());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearError());
        }

        if (isUpdated) {
            alert.success("Product updated successfully!");
            navigate("/dashboard/products");
            dispatch(resetDetails());
            dispatch(resetUpdate());
        }

    }, [
        id,
        dispatch,
        navigate,
        product.name,
        product.price,
        product.storeName,
        fetchError,
        updateError,
        product,
        isUpdated,
        alert
    ]);
    return (
        <>
            {loading || updateLoading ? <Loader /> : <></>}
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
                                                        <img src={process.env.REACT_APP_API_URL + "/" + oldFile} alt="prev" draggable={false} />
                                                    </div>
                                                </div>
                                        }
                                    </div>
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
            </div>
        </>
    )
}

export default UpdateProduct;