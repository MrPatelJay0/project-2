
import { useState } from "react";

function Registration({ onRegister, onBackToLogin }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleRegister(event) {
        event.preventDefault();

        if (
            name.trim() === "" ||
            email.trim() === "" ||
            department === "" ||
            username.trim() === "" ||
            password.length < 6
        ) {
            alert("Fill in all fields. Password needs 6 characters.");
            return;
        }

        const newEmployee = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim(),
            department: department,
            username: username.trim(),
            password: password,
            role: "Employee"
        };

        const savedUsers = JSON.parse(
            localStorage.getItem("registeredUsers") || "[]"
        );

        const usernameExists = savedUsers.some(
            (user) =>
                user.username.toLowerCase() ===
                newEmployee.username.toLowerCase()
        );

        if (usernameExists) {
            alert("This username is already registered.");
            return;
        }



        const updatedUsers = [...savedUsers, newEmployee];

        localStorage.setItem(
            "registeredUsers",
            JSON.stringify(updatedUsers)
        );

        // Remove any stale employee-table record with this username.
        const savedEmployees = JSON.parse(
            localStorage.getItem("employees") || "[]"
        );

        const cleanedEmployees = savedEmployees.filter(
            (employee) =>
                !employee.username ||
                employee.username.toLowerCase() !==
                newEmployee.username.toLowerCase()
        );

        const employeeRecord = {
            id: newEmployee.id,
            name: newEmployee.name,
            email: newEmployee.email,
            department: newEmployee.department,
            username: newEmployee.username
        };

        const updatedEmployees = [
            ...cleanedEmployees,
            employeeRecord
        ];

        localStorage.setItem(
            "employees",
            JSON.stringify(updatedEmployees)
        );

        onRegister(newEmployee);


    }

    return (
        <div className="container mt-4 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h3 className="mb-0">Employee Registration</h3>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
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
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(event) =>
                                            setUsername(event.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        minLength="6"
                                        required
                                    />
                                    <small className="text-muted">
                                        Use at least 6 characters.
                                    </small>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Register
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary w-100 mt-2"
                                    onClick={onBackToLogin}
                                >
                                    Back to Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;
