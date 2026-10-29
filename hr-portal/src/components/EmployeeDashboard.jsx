
import LeaveRequest from "./LeaveRequest";
import EmployeeProfile from "./EmployeeProfile";

function EmployeeDashboard({
    onLogout,
    currentUser,
    leaveRequests,
    setLeaveRequests
}) {
    return (
        <div>
            <nav className="navbar navbar-dark bg-success px-3">
                <span className="navbar-brand">
                    Employee Dashboard
                </span>

                <button className="btn btn-light" onClick={onLogout}>
                    Logout
                </button>
            </nav>

            <div className="container mt-4">
                <h2>Welcome, {currentUser}!</h2>
                <p>View your details and manage your leave requests.</p>
            </div>

            <EmployeeProfile currentUser={currentUser} />

            <LeaveRequest
                currentUser={currentUser}
                leaveRequests={leaveRequests}
                setLeaveRequests={setLeaveRequests}
            />

        </div>
    );
}

export default EmployeeDashboard;
