const Reports = () => {
    return (
        <>
            <div className="report-card-wrapper">
                <div className="report-card-parent">
                    <div className="report-card-childs">
                        <div className="report-card-inner-parent">
                            <div className="report-card-inner-childs report-primary">
                                <i className="fa fa-box"></i>
                            </div>
                            <div className="report-card-inner-childs">
                                <p>Orders</p>
                            </div>
                        </div>
                        <div className="report-counter">
                            <i className="fa fa-arrow-up increase"></i><h3>$3,594</h3>
                        </div>
                    </div>
                    <div className="report-card-childs">
                        <div className="report-card-inner-parent">
                            <div className="report-card-inner-childs report-bright">
                                <i className="fa fa-chart-line"></i>
                            </div>
                            <div className="report-card-inner-childs">
                                <p>Reports</p>
                            </div>
                        </div>
                        <div className="report-counter">
                            <i className="fa fa-arrow-down decrease"></i><h3>975</h3>
                        </div>
                    </div>
                    <div className="report-card-childs">
                        <div className="report-card-inner-parent">
                            <div className="report-card-inner-childs report-green">
                                <i className="fa fa-users"></i>
                            </div>
                            <div className="report-card-inner-childs">
                                <p>Customers</p>
                            </div>
                        </div>
                        <div className="report-counter">
                            <i className="fa fa-arrow-up increase"></i><h3>17,865</h3>
                        </div>
                    </div>
                    <div className="report-card-childs">
                        <div className="report-card-inner-parent">
                            <div className="report-card-inner-childs report-purple">
                                <i className="fa fa-phone"></i>
                            </div>
                            <div className="report-card-inner-childs">
                                <p>Sales</p>
                            </div>
                        </div>
                        <div className="report-counter">
                            <i className="fa fa-arrow-up increase"></i><h3>$3,594</h3>
                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default Reports