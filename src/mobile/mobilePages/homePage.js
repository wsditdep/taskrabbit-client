import { useNavigate } from "react-router-dom";
import speaker from "../../assets/images/redzy/speaker.png"
import landingSlider0 from "../../assets/images/redzy/slider/slider_img0.png"
import landingSlider1 from "../../assets/images/redzy/slider/slider_img1.png"
import landingSlider2 from "../../assets/images/redzy/slider/slider_img2.png"
import landingSlider3 from "../../assets/images/redzy/slider/slider_img3.png"
import landingSlider4 from "../../assets/images/redzy/slider/slider_img4.png"
import BottomNav from "../mobileComponents/BottomNav";
import taskrabbit_video from "../../assets/images/redzy/taskrabbit.mp4";
import logo_alt from "../../assets/images/redzy/taskrabbit.svg"
import { motion } from "framer-motion"
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationByID } from "../../states/actions/notificationAction";

const UserHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { notification } = useSelector(state => state.notification);

    const sendTo = (val) => {
        return navigate(val);
    }

    const [width, setWidth] = useState(0);
    const carousel = useRef()

    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)

        dispatch(getNotificationByID("6535ea9f61fc4a5231ede89e"));
    }, [])
    return (
        <>
            <section className="home-page-section background_texture">
                <div className="home-slider-container">
                    <div className="head-bar">
                        <div className="logo">
                            <img className="main-logo-alt" src={logo_alt} alt="main logo" />
                        </div>
                        <div className="profileLogo" onClick={() => sendTo("/userDashboard/userProfile")}>
                            <i class="fa fa-user"></i>
                        </div>
                    </div>
                    <div className="banner">
                        <div className="home-main-text">
                            <h2>Everyday life made easier</h2>
                        </div>
                        <span className="home-secound-text">Let’s explore together</span>
                    </div>
                    <div className="split">
                        <div>
                            <img src={speaker} alt="speaker" />
                        </div>
                        <div>
                            <p>{notification?.value}</p>
                        </div>
                    </div>
                    <motion.div
                        ref={carousel}
                        className="carousel"
                        whileTap={{ cursor: "grabbing" }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            drag="x"
                            dragConstraints={{ right: 0, left: -width }}
                            className="home-images-slider"
                        >
                            <div>
                                <img src={landingSlider0} alt="firs" />
                            </div>
                            <div>
                                <img src={landingSlider1} alt="secound" />
                            </div>
                            <div>
                                <img src={landingSlider2} alt="third" />
                            </div>
                            <div>
                                <img src={landingSlider3} alt="third" />
                            </div>
                            <div>
                                <img src={landingSlider4} alt="third" />
                            </div>

                        </motion.div>
                    </motion.div>
                    <div className="video-wrapper">
                        <video controls autoPlay muted controlsList="nodownload">
                            <source src={taskrabbit_video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="reviews-wrapper">
                        <h3>Don't just take our word for it</h3>
                        <p>See how Taskers are saving the day for people like you.</p>
                        <ul>
                            <li>
                                <div className="reviewer-image">
                                    <img src="https://res.cloudinary.com/taskrabbit-com/image/upload/c_fill,g_faces,h_50,w_50/v1569509078/s5fi364d3xlemzsahjmq.png" alt="alt" />
                                </div>
                                <div className="reviewer-details">
                                    <div className="reviewer-name">
                                        <h3>Kristine A.</h3>
                                        <ol>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </ol>
                                    </div>
                                    <p>
                                        "Amazing! Keri is a Machine! She's super quick and super efficient! "
                                        <br /><span>October 04, 2019, Vancouver</span>
                                    </p>
                                    <h5>Assemble Furniture</h5>
                                </div>
                            </li>
                            <li>
                                <div className="reviewer-image">
                                    <img src="https://res.cloudinary.com/taskrabbit-com/image/upload/c_fill,g_faces,h_50,w_50/v1569116553/xdgvw2az199f3itafywh.png" alt="alt" />
                                </div>
                                <div className="reviewer-details">
                                    <div className="reviewer-name">
                                        <h3>XXXXXX X.</h3>
                                        <ol>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </ol>
                                    </div>
                                    <p>
                                        "Justin did a great job & was very professional"
                                        <br /><span>October 02, 2019, Ottawa / Gatineau</span>
                                    </p>
                                    <h5>Shelf Mounting</h5>
                                </div>
                            </li>
                            <li>
                                <div className="reviewer-image">
                                    <img src="https://res.cloudinary.com/taskrabbit-com/image/upload/c_fill,g_faces,h_50,w_50/v1569354729/cfmmfmzherqjjf4woklf.png" alt="alt" />
                                </div>
                                <div className="reviewer-details">
                                    <div className="reviewer-name">
                                        <h3>Bradley M.</h3>
                                        <ol>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </ol>
                                    </div>
                                    <p>
                                        "Very friendly, helped me out at the last minute with what actually turned out to be a more difficult task that originally thought. Thanks!"
                                        <br /><span>September 30, 2019, Vancouver</span>
                                    </p>
                                    <h5>Lifting & Shifting</h5>
                                </div>
                            </li>
                            <li>
                                <div className="reviewer-image">
                                    <img src="https://res.cloudinary.com/taskrabbit-com/image/upload/c_fill,g_faces,h_50,w_50/v1569761106/xprr8z1fcvhchxaybdqk.png" alt="alt" />
                                </div>
                                <div className="reviewer-details">
                                    <div className="reviewer-name">
                                        <h3>XXXXXX X.</h3>
                                        <ol>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </ol>
                                    </div>
                                    <p>
                                        "Barton was very friendly, fast and efficient. He’s the real deal and will definitely look to use him in the future."
                                        <br /><span>September 29, 2019, Halifax</span>
                                    </p>
                                    <h5>Assemble Furniture</h5>
                                </div>
                            </li>
                            <li>
                                <div className="reviewer-image">
                                    <img src="https://res.cloudinary.com/taskrabbit-com/image/upload/c_fill,g_faces,h_50,w_50/v1569212086/scqlyiyr4txquo0dwjsb.png" alt="alt" />
                                </div>
                                <div className="reviewer-details">
                                    <div className="reviewer-name">
                                        <h3>XXXXXX X.</h3>
                                        <ol>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </ol>
                                    </div>
                                    <p>
                                        "Ronny was wonderful to work with. He is highly skilled, arrived promptly and prepared. I was wonderfully pleasant and communicative while..."
                                        <br /><span>September 27, 2019, Vancouver</span>
                                    </p>
                                    <h5>Shelf Mounting</h5>
                                </div>
                            </li>
                            <li>
                                <div className="reviewer-image">
                                    <img src="https://res.cloudinary.com/taskrabbit-com/image/upload/c_fill,g_faces,h_50,w_50/v1566998410/tswba3rglfvcg7v8gr5m.png" alt="alt" />
                                </div>
                                <div className="reviewer-details">
                                    <div className="reviewer-name">
                                        <h3>XXXXXX X. </h3>
                                        <ol>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </ol>
                                    </div>
                                    <p>
                                        "Alex helped us install the IKEA VIDGA curtain rail. The ceiling material is complicated but Alex was able to sort it out. Great job."
                                        <br /><span>September 01, 2019, Toronto</span>
                                    </p>
                                    <h5>Shelf Mounting</h5>
                                </div>
                            </li>
                            <li>
                                <div className="reviewer-image">
                                    <img src="https://res.cloudinary.com/taskrabbit-com/image/upload/c_fill,g_faces,h_50,w_50/v1566870753/hfpwuzn27bzzpmoujalj.png" alt="alt" />
                                </div>
                                <div className="reviewer-details">
                                    <div className="reviewer-name">
                                        <h3>XXXXXX X. </h3>
                                        <ol>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </ol>
                                    </div>
                                    <p>
                                        "Kayla helped me dismantle, move and re-assemble my sizeable computer desk and other luggage from 'ssauga to downtown. Her jeep seemed dec..."
                                        <br /><span>September 06, 2019, Toronto</span>
                                    </p>
                                    <h5>Lifting & Shifting</h5>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <BottomNav />
            </section>

        </>
    )
}

export default UserHome;