
import { useState, useEffect } from "react";

function EmployeeList() {
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [employees, setEmployees] = useState(() => {
        return JSON.parse(localStorage.getItem("employees") || "[]");
    });

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    function addEmployee(event) {
        event.preventDefault();

        if (
            !name.trim() ||
            !department ||
            !email.trim() ||
            !username.trim() ||
            !password
        ) {
            alert("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }

        const savedUsers = JSON.parse(
            localStorage.getItem("registeredUsers") || "[]"
        );

        const cleanUsername = username.trim();

        const usernameExists = savedUsers.some(
            (user) =>
                user.username.toLowerCase() === cleanUsername.toLowerCase()
        );

        if (usernameExists) {
            alert("This username already exists. Please choose another.");
            return;
        }

        const id = Date.now();

        // Employee record shown in the HR dashboard.
        const newEmployee = {
            id,
            name: name.trim(),
            department,
            email: email.trim(),
            username: cleanUsername
        };

        // Login account used by App.jsx.
        const newUser = {
            ...newEmployee,
            password,
            role: "Employee"
        };

        const savedEmployees = JSON.parse(
            localStorage.getItem("employees") || "[]"
        );

        const updatedEmployees = [...savedEmployees, newEmployee];
        const updatedUsers = [...savedUsers, newUser];

        // Save both records using the same ID.
        localStorage.setItem(
            "employees",
            JSON.stringify(updatedEmployees)
        );

        localStorage.setItem(
            "registeredUsers",
            JSON.stringify(updatedUsers)
        );

        setEmployees(updatedEmployees);

        setName("");
        setDepartment("");
        setEmail("");
        setUsername("");
        setPassword("");

        alert(
            `Employee added successfully!\n\nUsername: ${cleanUsername}\nThe employee can now log in with the password you created.`
        );
    }

    function handleDeleteEmployee(employee) {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${employee.name} and their login account?`
        );

        if (!confirmDelete) {
            return;
        }

        const savedEmployees = JSON.parse(
            localStorage.getItem("employees") || "[]"
        );

        const updatedEmployees = savedEmployees.filter(
            (item) => item.id !== employee.id
        );

        const savedUsers = JSON.parse(
            localStorage.getItem("registeredUsers") || "[]"
        );

        const updatedUsers = savedUsers.filter(
            (user) => user.id !== employee.id
        );

        const changedUsers = JSON.parse(
            localStorage.getItem("changedUsers") || "[]"
        );

        const updatedChangedUsers = changedUsers.filter(
            (savedUsername) => savedUsername !== employee.username
        );

        localStorage.setItem(
            "employees",
            JSON.stringify(updatedEmployees)
        );

        localStorage.setItem(
            "registeredUsers",
            JSON.stringify(updatedUsers)
        );

        localStorage.setItem(
            "changedUsers",
            JSON.stringify(updatedChangedUsers)
        );

        setEmployees(updatedEmployees);

        alert("Employee and login account deleted successfully.");
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-3">Employee Management</h3>

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h5 className="mb-3">Add New Employee</h5>

                    <form onSubmit={addEmployee}>
                        <div className="mb-3">
                            <label className="form-label">
                                Employee Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter employee name"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Department</label>
                            <select
                                className="form-select"
                                value={department}
                                onChange={(event) =>
                                    setDepartment(event.target.value)
                                }
                                required
                            >
                                <option value="">Select department</option>
                                <option value="IT">IT</option>
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email address"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Employee Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Create a login username"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Initial Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="At least 6 characters"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                minLength={6}
                                autoComplete="new-password"
                                required
                            />
                            <small className="text-muted">
                                The employee will use this password to log in.
                            </small>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Add Employee &amp; Create Account
                        </button>
                    </form>
                </div>
            </div>

            <h5>Employee Records</h5>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={employee.id}>
                                <td>{index + 1}</td>
                                <td>{employee.name}</td>
                                <td>{employee.department}</td>
                                <td>{employee.email}</td>
                                <td>{employee.username || "—"}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleDeleteEmployee(employee)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {employees.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No employees added yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <p className="text-muted">
                Total Employees: {employees.length}
            </p>
        </div>
    );
}

export default EmployeeList;
