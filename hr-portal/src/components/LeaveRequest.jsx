
import { useState } from "react";

function LeaveRequest({ currentUser, leaveRequests, setLeaveRequests }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");

    function submitLeave(event) {
        event.preventDefault();

        if (!startDate || !endDate) {
            alert("Please select both leave dates.");
            return;
        }

        if (new Date(endDate) < new Date(startDate)) {
            alert("End date cannot be before start date.");
            return;
        }

        const newRequest = {
            id: Date.now(),
            employeeName: currentUser,
            startDate: startDate,
            endDate: endDate,
            reason: reason,
            status: "Pending"
        };

        const updatedRequests = [...leaveRequests, newRequest];

        setLeaveRequests(updatedRequests);

        window.dispatchEvent(
            new CustomEvent("hr-data-updated", {
                detail: { leaveRequests: updatedRequests },
            })
        );

        setStartDate("");
        setEndDate("");
        setReason("");

        alert("Leave request submitted successfully");
    }

    const myRequests = leaveRequests.filter(
        (request) => request.employeeName === currentUser
    );

    return (
        <div className="container mt-4">
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-success text-white">
                    <h4 className="mb-0">Apply for Leave</h4>
                </div>

                <div className="card-body">
                    <form onSubmit={submitLeave}>
                        <div className="mb-3">
                            <label className="form-label">Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={startDate}
                                onChange={(event) => setStartDate(event.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={endDate}
                                onChange={(event) => setEndDate(event.target.value)}
                                min={startDate || undefined}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Reason for Leave</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={reason}
                                onChange={(event) => setReason(event.target.value)}
                                placeholder="Enter your reason"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-success">
                            Submit Leave Request
                        </button>
                    </form>
                </div>
            </div>

            <h4>My Leave Requests</h4>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myRequests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.startDate}</td>
                                <td>{request.endDate}</td>
                                <td>{request.reason}</td>
                                <td>
                                    <span
                                        className={
                                            request.status === "Approved"
                                                ? "badge bg-success"
                                                : request.status === "Rejected"
                                                    ? "badge bg-danger"
                                                    : "badge bg-warning text-dark"
                                        }
                                    >
                                        {request.status}
                                    </span>
                                </td>
                            </tr>
                        ))}

                        {myRequests.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No leave requests submitted.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LeaveRequest;
