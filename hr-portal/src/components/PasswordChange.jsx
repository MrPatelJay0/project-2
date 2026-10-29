
import { useState } from "react";

function PasswordChange({ currentUser, onPasswordChanged }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (newPassword.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    const userExists = registeredUsers.some(
      (user) => user.username === currentUser
    );

    if (!userExists) {
      alert("Employee account not found. Please contact HR.");
      return;
    }

    const updatedUsers = registeredUsers.map((user) =>
      user.username === currentUser
        ? { ...user, password: newPassword }
        : user
    );

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(updatedUsers)
    );

    onPasswordChanged();

    alert("Password changed successfully!");

    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-warning">
              <h4>Change Your Password</h4>
            </div>

            <div className="card-body">
              <p>
                Please change your initial password before
                accessing the employee dashboard.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(event) =>
                      setNewPassword(event.target.value)
                    }
                    minLength={6}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    minLength={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordChange;
