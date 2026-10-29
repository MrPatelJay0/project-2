
function LeaveManagement({ leaveRequests, setLeaveRequests }) {
    console.log(
        "TABLE PROPS:",
        leaveRequests.map((request) => ({
            id: request.id,
            status: request.status,
        }))
    );

    // Keep the rest of your existing code below.


    function updateStatus(id, newStatus) {
        const updatedRequests = leaveRequests.map((request) =>
            String(request.id) === String(id)
                ? { ...request, status: newStatus }
                : request
        );

        setLeaveRequests(updatedRequests);

        window.dispatchEvent(
            new CustomEvent("hr-data-updated", {
                detail: { leaveRequests: updatedRequests },
            })
        );
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-3">Leave Management</h3>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Employee</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {leaveRequests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.employeeName}</td>
                                <td>{request.startDate}</td>
                                <td>{request.endDate}</td>
                                <td>{request.reason}</td>
                                <td>{request.status}</td>
                                <td>
                                    {request.status === "Pending" ? (
                                        <div className="d-flex gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-success btn-sm"
                                                onClick={() =>
                                                    updateStatus(request.id, "Approved")
                                                }
                                            >
                                                Approve
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    updateStatus(request.id, "Rejected")
                                                }
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-muted">
                                            Decision made
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {leaveRequests.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No leave requests available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LeaveManagement;
