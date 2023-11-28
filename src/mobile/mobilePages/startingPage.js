import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserStart = () => {

    const navigate = useNavigate();

    const sendTo = (val) => {
        return navigate(val);
    }

    const [currentSlide, setCurrentSlide] = useState(0);

    const handleMoveSlide = (direction) => {
      const newSlide = currentSlide + direction;
      if (newSlide >= 0 && newSlide <= 2) {
        setCurrentSlide(newSlide);
      }
    };
    
    return (
        <>
            <section className="app-main-section">
                <div className="app-inner-view">
                <section className="starting-page-section">
                    <div class="slider-container">
                        <div class="slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                            <div class="slide">
                                <div class="slide-main-text">
                                    <h2>Everyday life made easier</h2>
                                </div>
                                <div class="slide-secound-text">
                                    <span>
                                        When life gets busy, you don’t have to tackle it alone. Get time back for what you love without breaking the bank.
                                    </span>
                                </div>
                                <button class="getStartBtn" onClick={() => handleMoveSlide(1)}>Get Started</button>
                                <div class="slider-dots">
                                    <div class="dot active"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                </div>
                            </div>
                            <div class="slide slide2">
                                <div class="slide-main-text">
                                    <h2>Everyday life made easier</h2>
                                </div>
                                <div class="slide-secound-text">
                                    <span>
                                        When life gets busy, you don’t have to tackle it alone. Get time back for what you love without breaking the bank.
                                    </span>
                                </div>
                                <button class="getStartBtn" onClick={() => handleMoveSlide(1)}>Get Started</button>
                                <div class="slider-dots">
                                    <div class="dot"></div>
                                    <div class="dot active"></div>
                                    <div class="dot"></div>
                                </div>
                            </div>
                            <div class="slide slide3">
                                <div class="slide-main-text">
                                    <h2>Everyday life made easier</h2>
                                </div>
                                <div class="slide-secound-text">
                                    <span>
                                        When life gets busy, you don’t have to tackle it alone. Get time back for what you love without breaking the bank.
                                    </span>
                                </div>
                                <button class="getStartBtn" onClick={() => sendTo("/userDashboard/home")}>Get Started</button>
                                <div class="slider-dots">
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot active"></div>
                                </div>
                            </div>
                        </div>
                    </div>     
                </section>
                </div>
            </section>
        </>
    )
}

export default UserStart;