import WebTrafic from "./WebTrafic";
import Analytics from "./dashboardComponents/analytics/Analytics";
import Reports from "./Reports";
import Breadcrumb from "../adminDashboard/Breadcrumb";

const AdminLanding = () => {

    return (
        <>
            <Breadcrumb
                icon="fa fa-chart-line"
                heading="Reports"
                subheading="Custom dashboard built using the included components"
                isButtons={true}
            />
            <div className="dashboard-content">
                <Reports />
                <WebTrafic />
                <Analytics />
            </div>
        </>
    )
}

export default AdminLanding;