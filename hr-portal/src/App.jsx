
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Registration from "./components/Registration";
import HRDashboard from "./components/HRDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import LeaveManagement from "./components/LeaveManagement";
import PasswordChange from "./components/PasswordChange";

function App() {
  const [loggedInRole, setLoggedInRole] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);

  const [leaveRequests, setLeaveRequests] = useState(() => {
    return JSON.parse(localStorage.getItem("leaveRequests") || "[]");
  });

  const [changedUsers, setChangedUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("changedUsers") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("leaveRequests", JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  useEffect(() => {
    localStorage.setItem("changedUsers", JSON.stringify(changedUsers));
  }, [changedUsers]);


  function handleLogin(role, username, password) {
    const cleanUsername = username.trim();

    if (role === "HR") {
      // Demo credentials only.
      if (
        cleanUsername === "admin" &&
        password === "Admin123"
      ) {
        setCurrentUser(cleanUsername);
        setLoggedInRole("HR");
      } else {
        alert("Invalid HR username or password.");
      }

      return;
    }

    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    const user = registeredUsers.find(
      (item) =>
        item.username === cleanUsername &&
        item.password === password
    );

    if (!user) {
      alert("Invalid username or password.");
      return;
    }

    setCurrentUser(user.username);
    setLoggedInRole("Employee");
  }


  function handleRegister() {
    setShowRegistration(false);
    alert("Registration successful! Please log in.");
  }

  function handleLogout() {
    setLoggedInRole("");
    setCurrentUser("");
  }

  function handlePasswordChanged() {
    if (!changedUsers.includes(currentUser)) {
      setChangedUsers([...changedUsers, currentUser]);
    }
  }

  if (showRegistration) {
    return (
      <Registration
        onRegister={handleRegister}
        onBackToLogin={() => setShowRegistration(false)}
      />
    );
  }

  if (loggedInRole === "HR") {
    return (
      <div>
        <HRDashboard onLogout={handleLogout} />

        <LeaveManagement
          leaveRequests={leaveRequests}
          setLeaveRequests={setLeaveRequests}
        />
      </div>
    );
  }

  if (loggedInRole === "Employee") {
    if (!changedUsers.includes(currentUser)) {
      return (
        <PasswordChange
          currentUser={currentUser}
          onPasswordChanged={handlePasswordChanged}
        />
      );
    }

    return (
      <EmployeeDashboard
        onLogout={handleLogout}
        currentUser={currentUser}
        leaveRequests={leaveRequests}
        setLeaveRequests={setLeaveRequests}
      />
    );
  }

  return (
    <Login
      onLogin={handleLogin}
      onShowRegistration={() => setShowRegistration(true)}
    />
  );
}

export default App;
