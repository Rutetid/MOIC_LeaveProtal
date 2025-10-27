import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ApplyLeave from "./components/ApplyLeave";
import AdminPortal from "./components/AdminPortal";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [userRole, setUserRole] = useState(""); // Store user role
  const [adminTab, setAdminTab] = useState("pending"); // "pending" or "archived"
  const [formData, setFormData] = useState({
    leaveType: "",
    subject: "",
    fromDate: null,
    toDate: null,
    numberOfDays: "",
    attachments: null,
  });

  // Mock data for user's applications
  const [applications, setApplications] = useState([
    {
      id: 1,
      leaveType: "Medical Leave",
      subject: "Medical checkup",
      fromDate: "01/10/25",
      toDate: "03/10/25",
      numberOfDays: 3,
      status: "Health Department",
      currentStage: 3,
      submittedDate: "28/09/25",
    },
    {
      id: 2,
      leaveType: "Casual Leave (CL)",
      subject: "Personal work",
      fromDate: "15/09/25",
      toDate: "16/09/25",
      numberOfDays: 2,
      status: "Approved",
      currentStage: 4,
      submittedDate: "10/09/25",
    },
    {
      id: 3,
      leaveType: "Earned Leave (EL)",
      subject: "Family function",
      fromDate: "20/08/25",
      toDate: "25/08/25",
      numberOfDays: 6,
      status: "Civil Surgeon",
      currentStage: 2,
      submittedDate: "15/08/25",
    },
  ]);

  // Mock data for admin - all applications from all users
  const [allApplications, setAllApplications] = useState([
    {
      id: 101,
      employeeName: "Dr. Rajesh Kumar",
      employeeId: "EMP001",
      leaveType: "Earned Leave (EL)",
      subject: "Family vacation",
      fromDate: "20/10/25",
      toDate: "25/10/25",
      numberOfDays: 6,
      status: "Pending",
      currentStage: 1,
      submittedDate: "15/10/25",
      department: "Cardiology",
    },
    {
      id: 102,
      employeeName: "Dr. Priya Sharma",
      employeeId: "EMP002",
      leaveType: "Medical Leave",
      subject: "Surgery recovery",
      fromDate: "18/10/25",
      toDate: "22/10/25",
      numberOfDays: 5,
      status: "Pending",
      currentStage: 1,
      submittedDate: "14/10/25",
      department: "Orthopedics",
    },
    {
      id: 103,
      employeeName: "Dr. Amit Patel",
      employeeId: "EMP003",
      leaveType: "Casual Leave (CL)",
      subject: "Personal work",
      fromDate: "17/10/25",
      toDate: "18/10/25",
      numberOfDays: 2,
      status: "Pending",
      currentStage: 1,
      submittedDate: "13/10/25",
      department: "Pediatrics",
    },
    {
      id: 104,
      employeeName: "Dr. Sneha Reddy",
      employeeId: "EMP004",
      leaveType: "Maternity Leave",
      subject: "Maternity leave",
      fromDate: "01/11/25",
      toDate: "31/01/26",
      numberOfDays: 90,
      status: "Archived",
      currentStage: 4,
      submittedDate: "01/10/25",
      department: "Gynecology",
      approvedDate: "05/10/25",
    },
    {
      id: 105,
      employeeName: "Dr. Vikram Singh",
      employeeId: "EMP005",
      leaveType: "Earned Leave (EL)",
      subject: "Attending conference",
      fromDate: "10/09/25",
      toDate: "15/09/25",
      numberOfDays: 6,
      status: "Archived",
      currentStage: 4,
      submittedDate: "25/08/25",
      department: "Neurology",
      approvedDate: "28/08/25",
    },
  ]);

  const leaveTypes = [
    "Earned Leave (EL)",
    "Casual Leave (CL)",
    "Maternity Leave",
    "Paternity Leave",
    "Childcare Leave",
    "Restricted Holiday",
    "Medical Leave",
    "Half Day leave",
    "Compensatory Off",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({
      ...prev,
      attachments: file || null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Leave application submitted successfully!");
  };

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
  };

  const handleApprove = (id) => {
    setAllApplications((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          // MOIC approves: move from stage 1 to stage 2
          if (app.currentStage === 1) {
            return {
              ...app,
              currentStage: 2,
              status: "Pending", // Still pending for CS
            };
          }
          // CS approves: move from stage 2 to stage 3
          else if (app.currentStage === 2) {
            return {
              ...app,
              currentStage: 3,
              status: "Pending", // Still pending for Health Dept
            };
          }
          // Health Dept approves: move to archived
          else {
            return {
              ...app,
              status: "Archived",
              currentStage: 4,
              approvedDate: new Date()
                .toLocaleDateString("en-GB")
                .split("/")
                .reverse()
                .join("/")
                .slice(-8),
            };
          }
        }
        return app;
      })
    );
  };

  const handleReject = (id) => {
    setAllApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: "Archived",
              currentStage: 0,
              rejectedDate: new Date()
                .toLocaleDateString("en-GB")
                .split("/")
                .reverse()
                .join("/")
                .slice(-8),
            }
          : app
      )
    );
  };

  const pendingApplications = allApplications.filter(
    (app) => app.status === "Pending"
  );
  const archivedApplications = allApplications.filter(
    (app) => app.status === "Archived"
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {!isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        ) : (
          <>
            <Navbar handleLogout={handleLogout} userRole={userRole} />
            <div className="py-12 px-4 sm:px-6 lg:px-8 pt-28 mt-1">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  {/* User Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      userRole === "moic" || userRole === "cs" ? (
                        <Navigate to="/admin" replace />
                      ) : (
                        <Dashboard applications={applications} />
                      )
                    }
                  />
                  <Route
                    path="/apply-leave"
                    element={
                      <ApplyLeave
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleFileChange={handleFileChange}
                        handleSubmit={handleSubmit}
                        leaveTypes={leaveTypes}
                      />
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      userRole === "moic" || userRole === "cs" ? (
                        <AdminPortal
                          adminTab={adminTab}
                          setAdminTab={setAdminTab}
                          pendingApplications={pendingApplications}
                          archivedApplications={archivedApplications}
                          handleApprove={handleApprove}
                          handleReject={handleReject}
                          userRole={userRole}
                        />
                      ) : (
                        <Navigate to="/dashboard" replace />
                      )
                    }
                  />

                  {/* Default redirect based on role */}
                  <Route
                    path="/"
                    element={
                      userRole === "moic" || userRole === "cs" ? (
                        <Navigate to="/admin" replace />
                      ) : (
                        <Navigate to="/dashboard" replace />
                      )
                    }
                  />

                  {/* Catch all */}
                  <Route
                    path="*"
                    element={
                      userRole === "moic" || userRole === "cs" ? (
                        <Navigate to="/admin" replace />
                      ) : (
                        <Navigate to="/dashboard" replace />
                      )
                    }
                  />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
