
import { useState, useRef, useEffect } from "react";

function Login({ onLogin, onShowRegistration }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Employee");
    const [roleOpen, setRoleOpen] = useState(false);
    const roleRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (
                roleRef.current &&
                !roleRef.current.contains(event.target)
            ) {
                setRoleOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    function handleLogin(event) {
        event.preventDefault();

        if (username.trim() === "" || password === "") {
            alert("Please enter username and password");
            return;
        }

        onLogin(role, username.trim(), password);
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow login-card">
                        <div className="card-body p-4">
                            <h2 className="text-center text-primary mb-4">
                                HR Portal Login
                            </h2>

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(event) =>
                                            setUsername(event.target.value)
                                        }
                                        placeholder="Enter username"
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
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>

                                <div className="mb-3">

                                    <div className="mb-3">
                                        <label className="form-label" id="login-role-label">
                                            Login As
                                        </label>

                                        <div className="role-picker" ref={roleRef}>
                                            <button
                                                type="button"
                                                className="form-select role-picker-button"
                                                aria-labelledby="login-role-label"
                                                aria-expanded={roleOpen}
                                                aria-haspopup="listbox"
                                                onClick={() => setRoleOpen(!roleOpen)}
                                                onKeyDown={(event) => {
                                                    if (event.key === "Escape") {
                                                        setRoleOpen(false);
                                                    }
                                                }}
                                            >
                                                {role === "Employee" ? "Employee" : "HR Admin"}
                                            </button>

                                            {roleOpen && (
                                                <div className="role-picker-menu" role="listbox">
                                                    {[
                                                        { value: "Employee", label: "Employee" },
                                                        { value: "HR", label: "HR Admin" },
                                                    ].map((option) => (
                                                        <button
                                                            type="button"
                                                            key={option.value}
                                                            role="option"
                                                            aria-selected={role === option.value}
                                                            className={`role-picker-option ${role === option.value ? "selected" : ""
                                                                }`}
                                                            onClick={() => {
                                                                setRole(option.value);
                                                                setRoleOpen(false);
                                                            }}
                                                        >
                                                            {option.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Login
                                </button>
                            </form>

                            <hr />

                            <p className="text-center mb-2">
                                New employee?
                            </p>

                            <button
                                type="button"
                                className="btn btn-outline-success w-100"
                                onClick={onShowRegistration}
                            >
                                Register as Employee
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
