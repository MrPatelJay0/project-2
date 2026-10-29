
import { useState } from "react";

function EmployeeProfile({ currentUser }) {


    const [name, setName] = useState(() => {
        const savedProfile = localStorage.getItem(
            "profile_" + currentUser
        );

        return savedProfile
            ? JSON.parse(savedProfile).name
            : currentUser;
    });

    const [email, setEmail] = useState(() => {
        const savedProfile = localStorage.getItem(
            "profile_" + currentUser
        );

        return savedProfile ? JSON.parse(savedProfile).email : "";
    });

    const [department, setDepartment] = useState(() => {
        const savedProfile = localStorage.getItem(
            "profile_" + currentUser
        );

        return savedProfile ? JSON.parse(savedProfile).department : "";
    });



    function updateProfile(event) {
        event.preventDefault();

        if (
            name.trim() === "" ||
            email.trim() === "" ||
            department === ""
        ) {
            alert("Please fill in all fields");
            return;
        }

        const profile = {
            name: name.trim(),
            email: email.trim(),
            department: department
        };

        // 1. Keep the employee's existing profile storage.
        localStorage.setItem(
            "profile_" + currentUser,
            JSON.stringify(profile)
        );

        // 2. Update the employee records shown in HR Dashboard.
        const savedEmployees = JSON.parse(
            localStorage.getItem("employees") || "[]"
        );

        const updatedEmployees = savedEmployees.map((employee) =>
            employee.username === currentUser
                ? { ...employee, ...profile }
                : employee
        );

        localStorage.setItem(
            "employees",
            JSON.stringify(updatedEmployees)
        );

        // 3. Update the registered employee's personal details.
        const savedUsers = JSON.parse(
            localStorage.getItem("registeredUsers") || "[]"
        );

        const updatedUsers = savedUsers.map((user) =>
            user.username === currentUser
                ? { ...user, ...profile }
                : user
        );

        localStorage.setItem(
            "registeredUsers",
            JSON.stringify(updatedUsers)
        );

        alert("Profile updated successfully!");
    }




    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">My Profile</h4>
                </div>

                <div className="card-body">
                    <form onSubmit={updateProfile}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={currentUser}
                                readOnly
                            />
                        </div>

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
                            <label className="form-label">Email Address</label>
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
                                onChange={(event) => setDepartment(event.target.value)}
                                required
                            >
                                <option value="">Select department</option>
                                <option value="IT">IT</option>
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmployeeProfile;
