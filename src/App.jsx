import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ApplyLeave from "./components/ApplyLeave";
import AdminPortal from "./components/AdminPortal";
import LandingPage from "./components/LandingPage";

// Success Modal Component
const SuccessModal = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Application Submitted!
        </h3>
        <p className="text-gray-600 mb-6">
          Your leave application has been submitted successfully and is now
          pending MOIC approval.
        </p>
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

// Wrapper component for ApplyLeave to use navigate
const ApplyLeaveWrapper = ({
  formData,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  leaveTypes,
  showSuccessModal,
  setShowSuccessModal,
}) => {
  const navigate = useNavigate();

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/dashboard");
  };

  return (
    <>
      <ApplyLeave
        formData={formData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        leaveTypes={leaveTypes}
      />
      {showSuccessModal && <SuccessModal onClose={handleModalClose} />}
    </>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [userRole, setUserRole] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem("userRole") || "";
  });
  const [adminTab, setAdminTab] = useState("pending"); // "pending" or "archived"
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal state
  const [formData, setFormData] = useState({
    leaveType: "",
    subject: "",
    fromDate: null,
    toDate: null,
    numberOfDays: "",
    attachments: null,
  });

  // Persist login state to localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("userRole", userRole);
  }, [isLoggedIn, userRole]);

  // Default mock data for user's applications
  const defaultApplications = [
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
  ];

  // Default mock data for admin - all applications from all users
  const defaultAllApplications = [
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
      status: "Accepted",
      currentStage: 2,
      submittedDate: "13/10/25",
      department: "Pediatrics",
      approvedByMOIC: "16/10/25",
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
      status: "Rejected",
      currentStage: 0,
      submittedDate: "25/08/25",
      department: "Neurology",
      rejectedDate: "28/08/25",
    },
    {
      id: 106,
      employeeName: "Dr. Anita Desai",
      employeeId: "EMP006",
      leaveType: "Casual Leave (CL)",
      subject: "Wedding ceremony",
      fromDate: "05/11/25",
      toDate: "07/11/25",
      numberOfDays: 3,
      status: "Accepted",
      currentStage: 3,
      submittedDate: "20/10/25",
      department: "Dermatology",
      approvedByMOIC: "22/10/25",
      approvedByCS: "24/10/25",
    },
  ];

  // Initialize from localStorage or use defaults
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("applications");
    return saved ? JSON.parse(saved) : defaultApplications;
  });

  const [allApplications, setAllApplications] = useState(() => {
    const saved = localStorage.getItem("allApplications");
    return saved ? JSON.parse(saved) : defaultAllApplications;
  });

  // Persist applications to localStorage
  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  // Persist allApplications to localStorage
  useEffect(() => {
    localStorage.setItem("allApplications", JSON.stringify(allApplications));
  }, [allApplications]);

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
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Auto-calculate number of days when dates are selected
      if (name === "fromDate" || name === "toDate") {
        const fromDate = name === "fromDate" ? value : prev.fromDate;
        const toDate = name === "toDate" ? value : prev.toDate;

        if (fromDate && toDate) {
          const diffTime = Math.abs(toDate - fromDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
          updatedData.numberOfDays = diffDays;
        }
      }

      return updatedData;
    });
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

    // Get current user name based on role
    const employeeNames = {
      doctor: "Dr. User",
      practitioner: "Practitioner User",
    };

    const employeeIds = {
      doctor: "EMP999",
      practitioner: "EMP998",
    };

    const departments = {
      doctor: "General Medicine",
      practitioner: "Nursing",
    };

    // Format dates to DD/MM/YY
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = String(d.getFullYear()).slice(-2);
      return `${day}/${month}/${year}`;
    };

    // Create new application
    const newApplication = {
      id: Date.now(),
      employeeName: employeeNames[userRole] || "User",
      employeeId: employeeIds[userRole] || "EMP000",
      leaveType: formData.leaveType,
      subject: formData.subject,
      fromDate: formatDate(formData.fromDate),
      toDate: formatDate(formData.toDate),
      numberOfDays: formData.numberOfDays,
      status: "Pending",
      currentStage: 1, // Stage 1 = Applied (visible to MOIC)
      submittedDate: formatDate(new Date()),
      department: departments[userRole] || "General",
    };

    // Add to user's applications
    setApplications((prev) => [newApplication, ...prev]);

    // Add to all applications (for admin view)
    setAllApplications((prev) => [newApplication, ...prev]);

    // Reset form
    setFormData({
      leaveType: "",
      subject: "",
      fromDate: null,
      toDate: null,
      numberOfDays: "",
      attachments: null,
    });

    // Show success modal
    setShowSuccessModal(true);
  };

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    // Clear localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
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
              status: "Pending", // Still pending for CS to review
              moicApproved: true, // Track MOIC approval
            };
          }
          // CS approves: move from stage 2 to stage 3
          else if (app.currentStage === 2) {
            return {
              ...app,
              currentStage: 3,
              status: "Pending", // Still pending for Health Dept
              csApproved: true, // Track CS approval
            };
          }
          // Health Dept approves: move to archived
          else {
            return {
              ...app,
              status: "Accepted",
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
              status: "Rejected",
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

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <LandingPage
                handleLogout={handleLogout}
                userRole={userRole}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Protected Routes */}
          {isLoggedIn ? (
            <>
              {/* User Routes */}
              <Route
                path="/dashboard"
                element={
                  <>
                    <Navbar handleLogout={handleLogout} userRole={userRole} />
                    <div className="py-12 px-4 sm:px-6 lg:px-8 pt-28 mt-1">
                      <div className="max-w-7xl mx-auto">
                        {userRole === "moic" || userRole === "cs" ? (
                          <Navigate to="/admin" replace />
                        ) : (
                          <Dashboard
                            applications={applications}
                            userRole={userRole}
                          />
                        )}
                      </div>
                    </div>
                  </>
                }
              />
              <Route
                path="/apply-leave"
                element={
                  <>
                    <Navbar handleLogout={handleLogout} userRole={userRole} />
                    <div className="py-12 px-4 sm:px-6 lg:px-8 pt-28 mt-1">
                      <div className="max-w-7xl mx-auto">
                        <ApplyLeaveWrapper
                          formData={formData}
                          handleInputChange={handleInputChange}
                          handleFileChange={handleFileChange}
                          handleSubmit={handleSubmit}
                          leaveTypes={leaveTypes}
                          showSuccessModal={showSuccessModal}
                          setShowSuccessModal={setShowSuccessModal}
                        />
                      </div>
                    </div>
                  </>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <>
                    <Navbar handleLogout={handleLogout} userRole={userRole} />
                    <div className="py-12 px-4 sm:px-6 lg:px-8 pt-28 mt-1">
                      <div className="max-w-7xl mx-auto">
                        {userRole === "moic" || userRole === "cs" ? (
                          <AdminPortal
                            adminTab={adminTab}
                            setAdminTab={setAdminTab}
                            allApplications={allApplications}
                            handleApprove={handleApprove}
                            handleReject={handleReject}
                            userRole={userRole}
                          />
                        ) : (
                          <Navigate to="/dashboard" replace />
                        )}
                      </div>
                    </div>
                  </>
                }
              />
            </>
          ) : (
            <>
              {/* Redirect to login if not logged in */}
              <Route
                path="/dashboard"
                element={<Navigate to="/login" replace />}
              />
              <Route
                path="/apply-leave"
                element={<Navigate to="/login" replace />}
              />
              <Route path="/admin" element={<Navigate to="/login" replace />} />
            </>
          )}

          {/* Catch all */}
          <Route
            path="*"
            element={
              isLoggedIn ? (
                userRole === "moic" || userRole === "cs" ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
