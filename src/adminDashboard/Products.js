const Products = () => {
    return (
        <>
            <div className="d-tables mt-4">
                <div className="d-card">
                    <div className="d-card-header d-card-header-bg-color d-card-heading-font card-header-padding">
                        <p>PRODUCT LIST</p>
                        <h3>Recent Users</h3>
                    </div>
                    <div className="d-card-body card-body-padding d-card-body-bg-color">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Quantity</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Product 1</td>
                                    <td>250</td>
                                    <td>12</td>
                                    <td>Aug 3 - 2023</td>
                                    <td className="table-action">
                                        <ul>
                                            <a href="/#">
                                                <li><i className="fa fa-eye"></i></li>
                                            </a>
                                            <a href="/#">
                                                <li><i className="fa fa-pen"></i></li>
                                            </a>
                                            <a href="/#">
                                                <li className="delete"><i className="fa fa-trash-alt"></i></li>
                                            </a>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Product 1</td>
                                    <td>250</td>
                                    <td>12</td>
                                    <td>Aug 3 - 2023</td>
                                    <td className="table-action">
                                        <ul>
                                            <a href="/#">
                                                <li><i className="fa fa-eye"></i></li>
                                            </a>
                                            <a href="/#">
                                                <li><i className="fa fa-pen"></i></li>
                                            </a>
                                            <a href="/#">
                                                <li><i className="fa fa-trash-alt"></i></li>
                                            </a>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Product 1</td>
                                    <td>250</td>
                                    <td>12</td>
                                    <td>Aug 3 - 2023</td>
                                    <td className="table-action">
                                        <ul>
                                            <a href="/#">
                                                <li><i className="fa fa-eye"></i></li>
                                            </a>
                                            <a href="/#">
                                                <li><i className="fa fa-pen"></i></li>
                                            </a>
                                            <a href="/#">
                                                <li><i className="fa fa-trash-alt"></i></li>
                                            </a>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Product 1</td>
                                    <td>250</td>
                                    <td>12</td>
                                    <td>Aug 3 - 2023</td>
                                    <td className="table-action">
                                        <ul>
                                            <a href="/#">
                                                <li><i className="fa fa-eye"></i></li>
                                            </a>
                                            <a href="/#">
                                                <li><i className="fa fa-pen"></i></li>
                                            </a>
                                            <a href="/#">
                                                <li><i className="fa fa-trash-alt"></i></li>
                                            </a>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Product 1</td>
                                    <td>250</td>
                                    <td>12</td>
                                    <td>Aug 3 - 2023</td>
                                    <td className="table-action">
                                        <ul>
                                            <a href="/#">
                                                <li><i className="fa fa-eye"></i></li>
                                            </a>
                                            <a href="/#">
                                                <li><i className="fa fa-pen"></i></li>
                                            </a>
                                            <a href="/#">
                                                <li><i className="fa fa-trash-alt"></i></li>
                                            </a>
                                        </ul>
                                    </td>
                                </tr>
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
        </>
    )
}

export default Products;