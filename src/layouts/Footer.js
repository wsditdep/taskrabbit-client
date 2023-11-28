import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <section className="footer-section">
                <div className="container">
                    <div className="row">
                        <div className="stay-connected">
                            <p>Stay Connceted | <Link to="/#">JOIN US</Link></p>
                        </div>
                        <div className="footer-line-break"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="footer-quicklink">
                                <ul>
                                    <li>
                                        <Link to="/#">About us</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Mobile App</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Branches</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Promotions</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Career</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Terms and condutions</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-quicklink">
                                <ul>
                                    <li>
                                        <Link to="/#">Crypto currency</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Foreign Exchange</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Travelcard</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Billing Payments</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">International Bill Payments</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Value-Added Services </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-quicklink">
                                <ul>
                                    <li>
                                        <Link to="/#">Corporate Services</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Payroll Solutions</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Corporate Solutions</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Cash Collection</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Link bank account</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">News letters</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-quicklink">
                                <ul>
                                    <li>
                                        <Link to="/#">Contact Us</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Frequently Asked Questions </Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">AML Policy</Link>
                                    </li>
                                    <li>
                                        <Link to="/#">Disclosure Statement</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="copyright">
                                <p>Copyright © 2023 our program. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Footer;