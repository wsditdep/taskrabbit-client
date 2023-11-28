const Conformation = ({ setConformBox, proceedFurther }) => {
    const cancleProcess = () => {
        return setConformBox(false);
    }
    return (
        <>
            <div className="conformation-wrapper">
                <div className="conformation-inner-wrapper">
                    <h3>Do you want to logout!</h3>
                    <p>Plase conform before proceed</p>
                    <div className="confomation-button-wrapper">
                        <button onClick={cancleProcess}>CANCEL</button>
                        <button className="logout-btn" onClick={proceedFurther}>LOGOUT <i className="fa fa-sign-out"></i></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Conformation;