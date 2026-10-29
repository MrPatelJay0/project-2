# CREATING AN HR PORTAL USING REACT

## Phase-End Project Report

**Program:** Full Stack Development Program with Generative AI  
**Project Title:** Creating an HR Portal Using React

**Submitted by:** [Patel Jay]  
**Institute / Organization:** [SimpliLearn]  
**Submission Date:** [29-10-2026]

---

## 1. Introduction

The Human Resources (HR) Portal is a web-based application developed using React. It is designed to simplify common HR activities, such as managing employee records, handling employee registration, and processing leave requests.

The application provides separate interfaces for HR administrators and employees. HR administrators can manage employee records and review leave applications, while employees can register, access their dashboard, update their profile, and submit leave requests.

The project demonstrates how React components, JavaScript, CSS, and browser storage can be used to develop an interactive and responsive web application.

## 2. Project Objective

The main objective is to develop a user-friendly HR portal that simplifies employee management and leave administration.

The specific objectives are:

- To develop login and employee registration interfaces.
- To provide separate HR and employee dashboards.
- To implement role-based navigation and access flows.
- To allow HR administrators to add and delete employee records.
- To allow employees to submit leave requests.
- To enable HR administrators to approve or reject leave requests.
- To provide employee profile editing and password-change functionality.
- To store application data using browser localStorage.
- To create a responsive interface using CSS and Bootstrap.

## 3. Problem Statement

Traditional HR processes may rely on manual records, spreadsheets, and paper-based leave applications. These methods can make employee information difficult to organize and leave decisions difficult to track.

The HR Portal provides a centralized user interface for these activities. It makes employee records easier to manage and provides a structured workflow for submitting and reviewing leave requests.

## 4. Technologies Used

### 4.1 HTML

HTML provides the basic structure of the application's interface, including forms, tables, buttons, headings, and navigation elements.

### 4.2 CSS

CSS is used to style the application, including colors, spacing, typography, layouts, and responsive presentation.

### 4.3 JavaScript

JavaScript implements application logic, form validation, event handling, data filtering, and leave-status updates.

### 4.4 React.js

React is used to build reusable interface components and manage dynamic application state with hooks such as useState and useEffect.

### 4.5 Bootstrap

Bootstrap provides responsive layout utilities, form styles, buttons, tables, cards, and other interface elements.

### 4.6 Browser localStorage

localStorage stores application data in the browser so that supported records remain available after refreshing the page in the same browser profile.

### 4.7 Node.js and npm

Node.js and npm are used in the development environment to run the JavaScript tooling and manage project dependencies. The current application is primarily frontend-based and does not implement a separate Node.js backend.

## 5. System Requirements

### Hardware Requirements

- Computer or laptop
- Keyboard and pointing device
- Sufficient memory and storage to run a modern browser and development tools

### Software Requirements

- Windows, macOS, or another compatible operating system
- Visual Studio Code or another code editor
- Node.js and npm
- A modern web browser
- React and Vite project dependencies
- Internet access for installing dependencies when required

## 6. System Modules

### 6.1 Login Module

Provides a login interface for HR administrators and registered employees. It checks the submitted credentials according to the application's current authentication logic.

### 6.2 Employee Registration Module

Allows new employees to enter personal and account details. The application checks for duplicate usernames before saving a new registration.

### 6.3 HR Dashboard Module

Displays an overview of employee and leave information. It includes summary cards for total employees, pending leave requests, approved leave requests, and rejected leave requests.

### 6.4 Employee Management Module

Allows the HR administrator to add employee records, view them in a table, and delete records.

### 6.5 Employee Dashboard Module

Provides employees with access to their HR-related features, including profile information and leave requests.

### 6.6 Leave Request Module

Allows employees to submit leave applications by entering start dates, end dates, and a reason. The application checks that required dates are provided and that the end date is not earlier than the start date.

### 6.7 Leave Management Module

Allows the HR administrator to review pending requests and approve or reject them. The application updates the request status and reflects the decision in the interface.

### 6.8 Employee Profile Module

Allows employees to view and edit supported profile information. The username is read-only where implemented.

### 6.9 Password-Change Module

Provides a password-change workflow with input validation and application-level tracking of whether a user has completed the required password-change step.

## 7. System Design and Data Flow

The application follows a component-based React structure.

1. The user opens the application and uses the login or registration interface.
2. The application determines which dashboard to display based on the user's role and current application state.
3. HR administrators interact with employee-management and leave-management components.
4. Employees use their dashboard to manage supported profile information and submit leave requests.
5. React state updates the displayed interface when data changes.
6. The application saves supported records to browser localStorage for persistence across page refreshes.

**Data storage note:** The current implementation uses browser localStorage rather than a separate server-side database. Data is therefore tied to the browser profile and device, rather than being shared automatically across different users' browsers.

## 8. Implementation Details

The project is organized into reusable React components. The main App component manages the login flow and shared leave-request state. Individual components handle login, registration, dashboards, employee records, profile editing, password changes, and leave management.

React's useState hook manages changing values, while useEffect is used for tasks such as saving shared state to localStorage. Event handlers process actions such as form submission, employee deletion, and leave approval or rejection.

CSS and Bootstrap are used to provide a consistent visual style and responsive layouts.

## 9. Testing and Results

The following tests should be completed and verified before submission.

| Test Case | Expected Result |
|---|---|
| HR login | HR dashboard opens with valid demo credentials |
| Employee registration | Valid details create an account |
| Duplicate username | Duplicate registration is rejected |
| Employee management | Employee records can be added and deleted |
| Leave submission | Valid leave request appears with Pending status |
| Approve leave | Status changes to Approved without refreshing |
| Reject leave | Status changes to Rejected without refreshing |
| Leave persistence | Updated status remains after refreshing |
| Employee profile | Supported profile fields can be edited |
| Password change | Valid password-change workflow completes |
| Responsive interface | Layout remains usable at supported screen sizes |

Record the actual result of each test before final submission. Include screenshots as evidence for important workflows.

## 10. Limitations

The current version is a frontend demonstration. It uses browser localStorage for persistence and does not include a separate backend service or centralized database.

The current client-side login and storage design is not suitable for production HR data. A production system would require secure server-side authentication, authorization, password hashing, input validation, protected APIs, and appropriate database controls.

## 11. Future Enhancements

Possible improvements include:

- Integrating a Node.js and Express backend.
- Adding a centralized database.
- Implementing secure authentication and server-side authorization.
- Adding employee search, filtering, and pagination.
- Providing email or in-app notifications for leave decisions.
- Introducing audit logs and more detailed HR reports.
- Improving automated testing and deployment.

These are proposed future enhancements and are not claimed as completed features of the current version.

## 12. Conclusion

The HR Portal project demonstrates the development of an interactive web application using React, JavaScript, CSS, Bootstrap, and browser localStorage.

The application brings together employee registration, employee record management, leave submission, leave approval and rejection, profile editing, and password-change workflows in a single interface.

The project provides practical experience with React components, state management, event handling, form validation, persistence, responsive design, and application testing. It also establishes a foundation for future full-stack development using a backend and database.

## 13. References

- Phase-End Project: Creating an HR Portal Using React.
- React documentation: https://react.dev/
- MDN Web Docs: https://developer.mozilla.org/
- Bootstrap documentation: https://getbootstrap.com/
- Vite documentation: https://vite.dev/
- Node.js documentation: https://nodejs.org/

---

**Appendix: Application Screenshots**

Insert your actual screenshots with captions:

1. Figure 1 — HR Portal Login Page
2. Figure 2 — Employee Registration Page
3. Figure 3 — HR Dashboard
4. Figure 4 — Employee Management Form
5. Figure 5 — Employee Records Table
6. Figure 6 — Employee Dashboard
7. Figure 7 — Leave Request Form
8. Figure 8 — HR Leave Management Table
9. Figure 9 — Approved Leave Status
10. Figure 10 — Employee Profile or Password-Change Screen
