
import { useEffect, useState } from "react";
import EmployeeList from "./EmployeeList";

function HRDashboard({ onLogout }) {
    const [stats, setStats] = useState({
        employees: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
    });

    useEffect(() => {


        function loadStats(event) {
            const employees = JSON.parse(
                localStorage.getItem("employees") || "[]"
            );

            const leaveRequests =
                event?.detail?.leaveRequests ??
                JSON.parse(localStorage.getItem("leaveRequests") || "[]");

            setStats({
                employees: employees.length,
                pending: leaveRequests.filter(
                    (request) => request.status === "Pending"
                ).length,
                approved: leaveRequests.filter(
                    (request) => request.status === "Approved"
                ).length,
                rejected: leaveRequests.filter(
                    (request) => request.status === "Rejected"
                ).length,
            });
        }

        loadStats();

        window.addEventListener("storage", loadStats);
        window.addEventListener("hr-data-updated", loadStats);

        return () => {
            window.removeEventListener("storage", loadStats);
            window.removeEventListener("hr-data-updated", loadStats);
        };

    }, []);

    const cards = [
        {
            title: "Total Employees",
            value: stats.employees,
            icon: "👥",
            color: "primary",
        },
        {
            title: "Pending Leaves",
            value: stats.pending,
            icon: "🕒",
            color: "warning",
        },
        {
            title: "Approved Leaves",
            value: stats.approved,
            icon: "✓",
            color: "success",
        },
        {
            title: "Rejected Leaves",
            value: stats.rejected,
            icon: "✕",
            color: "danger",
        },
    ];

    return (
        <div className="hr-dashboard">
            <nav className="navbar navbar-dark bg-primary px-3 px-md-4">
                <span className="navbar-brand mb-0">
                    <span className="me-2">◆</span>
                    HR Portal
                    <span className="ms-2 small fw-normal opacity-75">
                        Admin
                    </span>
                </span>

                <button
                    type="button"
                    className="btn btn-light"
                    onClick={onLogout}
                >
                    Logout
                </button>
            </nav>

            <main className="container py-4 py-md-5">
                <section className="hr-welcome mb-4">
                    <p className="text-primary fw-semibold mb-2">
                        ADMINISTRATION / OVERVIEW
                    </p>

                    <h1 className="h2 mb-2">
                        Welcome back, HR Admin!
                    </h1>

                    <p className="mb-0">
                        Manage employee records and monitor leave activity
                        from one place.
                    </p>
                </section>

                <section className="row g-3 mb-5">
                    {cards.map((card) => (
                        <div
                            className="col-12 col-sm-6 col-xl-3"
                            key={card.title}
                        >
                            <div className="card hr-stat-card h-100">
                                <div className="card-body d-flex align-items-center gap-3">
                                    <div
                                        className={`hr-stat-icon text-${card.color}`}
                                        aria-hidden="true"
                                    >
                                        {card.icon}
                                    </div>

                                    <div>
                                        <p className="small mb-1">
                                            {card.title}
                                        </p>
                                        <h2 className="h3 mb-0">
                                            {card.value}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                <EmployeeList />
            </main>
        </div>
    );
}

export default HRDashboard;
