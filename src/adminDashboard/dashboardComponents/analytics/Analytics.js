import AccountsAnalytics from "./AccountsAnalytics";
import CommissionAnalytics from "./CommissionAnalytics";


const Analytics = () => {
    return (
        <>
            <div className="analytics-wrapper">
                <div className="analytics-wrapper-parents">
                    <div className="analytics-wrapper-childs">
                        <div className="d-card">
                            <div className="d-card-header d-card-heading-font card-header-padding">
                                <p>Analytics</p>
                                <h3>Analyze Commissions</h3>
                            </div>
                            <div className="d-card-body d-card-body-bg-color card-header-padding">
                                <CommissionAnalytics />
                            </div>
                        </div>
                    </div>
                    <div className="analytics-wrapper-childs">
                        <div className="d-card">
                            <div className="d-card-header d-card-heading-font card-header-padding">
                                <p>Analytics</p>
                                <h3>User Type</h3>
                            </div>
                            <div className="d-card-body d-card-body-bg-color card-body-padding">
                                <AccountsAnalytics />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Analytics;
