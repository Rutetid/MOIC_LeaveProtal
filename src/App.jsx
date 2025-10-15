import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [currentView, setCurrentView] = useState("dashboard"); // "dashboard", "apply", or "admin"
  const [adminTab, setAdminTab] = useState("pending"); // "pending" or "archived"
  const [formData, setFormData] = useState({
    leaveType: "",
    subject: "",
    fromDate: "",
    toDate: "",
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
      days: 3,
      status: "Health Department",
      currentStage: 3,
      appliedDate: "28/09/25",
    },
    {
      id: 2,
      leaveType: "Casual Leave (CL)",
      subject: "Personal work",
      fromDate: "15/09/25",
      toDate: "16/09/25",
      days: 2,
      status: "Approved",
      currentStage: 4,
      appliedDate: "10/09/25",
    },
    {
      id: 3,
      leaveType: "Earned Leave (EL)",
      subject: "Family function",
      fromDate: "20/08/25",
      toDate: "25/08/25",
      days: 6,
      status: "Civil Surgeon",
      currentStage: 2,
      appliedDate: "15/08/25",
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
      days: 6,
      status: "Pending",
      currentStage: 1,
      appliedDate: "15/10/25",
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
      days: 5,
      status: "Pending",
      currentStage: 1,
      appliedDate: "14/10/25",
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
      days: 2,
      status: "Pending",
      currentStage: 1,
      appliedDate: "13/10/25",
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
      days: 90,
      status: "Archived",
      currentStage: 4,
      appliedDate: "01/10/25",
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
      days: 6,
      status: "Archived",
      currentStage: 4,
      appliedDate: "25/08/25",
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
    setFormData((prev) => ({
      ...prev,
      attachments: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Leave application submitted successfully!");
  };

  const handleApprove = (id) => {
    setAllApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: "Archived",
              currentStage: 4,
              approvedDate: new Date()
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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-black/80 to-black/90  shadow-lg">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {/* Stethoscope Icon */}
              <svg
                className="w-8 h-8 text-white mr-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                />
              </svg>
              <div className="text-white">
                <h1 className="text-xl font-bold">Medical Leave Portal</h1>
                <p className="text-xs text-teal-100">MOIC Leave Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Navigation Buttons */}
              <button
                onClick={() => setCurrentView("dashboard")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentView === "dashboard"
                    ? "bg-white text-teal-600"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView("apply")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentView === "apply"
                    ? "bg-white text-teal-600"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Apply Leave
              </button>
              <button
                onClick={() => setCurrentView("admin")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentView === "admin"
                    ? "bg-white text-teal-600"
                    : "text-white hover:bg-white/10"
                }`}
              >
                MOIC Portal
              </button>
              {/* Medical Icons */}
              <div className="hidden md:flex items-center space-x-3 text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {currentView === "dashboard" ? (
            // Dashboard View
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                My Leave Applications
              </h2>

              <div className="space-y-6">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {app.leaveType}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              app.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{app.subject}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {app.fromDate} - {app.toDate}
                          </span>
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {app.days} days
                          </span>
                          <span>Applied on: {app.appliedDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between relative">
                        {/* Timeline Line */}
                        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                          <div
                            className="h-full bg-gradient-to-r from-teal-500 to-cyan-600 transition-all duration-500"
                            style={{
                              width: `${(app.currentStage / 4) * 100}%`,
                            }}
                          ></div>
                        </div>

                        {/* Stage 1: Applied */}
                        <div className="flex flex-col items-center z-10 bg-gray-50 px-2">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                              app.currentStage >= 1
                                ? "bg-teal-500 border-teal-500"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {app.currentStage >= 1 ? (
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                            )}
                          </div>
                          <p className="text-xs font-medium text-gray-600 mt-2 text-center">
                            Applied
                          </p>
                        </div>

                        {/* Stage 2: MOIC */}
                        <div className="flex flex-col items-center z-10 bg-gray-50 px-2">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                              app.currentStage >= 2
                                ? "bg-teal-500 border-teal-500"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {app.currentStage >= 2 ? (
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                            )}
                          </div>
                          <p className="text-xs font-medium text-gray-600 mt-2 text-center">
                            MOIC
                          </p>
                        </div>

                        {/* Stage 3: Civil Surgeon */}
                        <div className="flex flex-col items-center z-10 bg-gray-50 px-2">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                              app.currentStage >= 3
                                ? "bg-teal-500 border-teal-500"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {app.currentStage >= 3 ? (
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                            )}
                          </div>
                          <p className="text-xs font-medium text-gray-600 mt-2 text-center">
                            Civil Surgeon
                          </p>
                        </div>

                        {/* Stage 4: Health Department */}
                        <div className="flex flex-col items-center z-10 bg-gray-50 px-2">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                              app.currentStage >= 4
                                ? "bg-teal-500 border-teal-500"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {app.currentStage >= 4 ? (
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                            )}
                          </div>
                          <p className="text-xs font-medium text-gray-600 mt-2 text-center">
                            Health Dept
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : currentView === "apply" ? (
            // Apply Leave Form View
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Sidebar - Info Cards */}
              <div className="space-y-6">
                {/* Leave Info Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">
                      Leave Balance
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Earned Leave</span>
                      <span className="font-semibold text-gray-900">
                        12 days
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Casual Leave</span>
                      <span className="font-semibold text-gray-900">
                        8 days
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Medical Leave</span>
                      <span className="font-semibold text-gray-900">
                        15 days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Medical Icon Card */}
                <div className="bg-green-800 rounded-xl p-6 text-white">
                  <div className="flex justify-center mb-4">
                    <svg
                      className="w-20 h-20"
                      viewBox="0 0 100 100"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M30 45 Q30 35, 35 30 L40 25 Q45 20, 50 25 L55 30 Q60 35, 60 45 L60 55 Q60 65, 55 70 L50 75 Q45 80, 40 75 L35 70 Q30 65, 30 55 Z"
                        strokeWidth="3"
                        fill="none"
                      />
                      <circle cx="50" cy="50" r="8" fill="currentColor" />
                      <path
                        d="M50 25 L50 15 M50 85 L50 75 M25 50 L15 50 M85 50 L75 50"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M35 35 L28 28 M65 35 L72 28 M35 65 L28 72 M65 65 L72 72"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-center text-lg font-semibold mb-2">
                    Healthcare Professional
                  </h3>
                  <p className="text-center text-sm text-teal-100">
                    Quick and easy leave processing for medical staff
                  </p>
                </div>

                {/* Important Notes */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center mb-3">
                    <svg
                      className="w-5 h-5 text-amber-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Important Notes
                    </h3>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span>
                        Submit applications at least 48 hours in advance
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span>
                        Medical certificates required for medical leaves
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span>Maximum file size: 10MB (PDF only)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Main Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {/* Form Header */}
                  <div className="bg-gray-50 border-b border-gray-200 px-8 py-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Leave Application Form
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Fill in the details below
                        </p>
                      </div>
                      <div className="bg-green-700 text-white rounded-full w-12 h-12 flex items-center justify-center">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Leave Type */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                          />
                        </svg>
                        Type of Leave{" "}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        name="leaveType"
                        value={formData.leaveType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        <option value="">Select leave type</option>
                        {leaveTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Subject <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="Brief reason for leave"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    {/* Date Range */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <svg
                            className="w-4 h-4 mr-2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          From Date <span className="text-red-500 ml-1">*</span>
                        </label>
                        <DatePicker
                          selected={
                            formData.fromDate
                              ? new Date(formData.fromDate)
                              : null
                          }
                          onChange={(date) =>
                            setFormData((prev) => ({ ...prev, fromDate: date }))
                          }
                          dateFormat="dd/MM/yy"
                          placeholderText="DD/MM/YY"
                          required
                          onKeyDown={(e) => e.preventDefault()}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <svg
                            className="w-4 h-4 mr-2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          To Date <span className="text-red-500 ml-1">*</span>
                        </label>
                        <DatePicker
                          selected={
                            formData.toDate ? new Date(formData.toDate) : null
                          }
                          onChange={(date) =>
                            setFormData((prev) => ({ ...prev, toDate: date }))
                          }
                          dateFormat="dd/MM/yy"
                          placeholderText="DD/MM/YY"
                          required
                          minDate={
                            formData.fromDate
                              ? new Date(formData.fromDate)
                              : null
                          }
                          onKeyDown={(e) => e.preventDefault()}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Number of Days */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                          />
                        </svg>
                        Number of Days{" "}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="number"
                        name="numberOfDays"
                        value={formData.numberOfDays}
                        onChange={handleInputChange}
                        required
                        min="0.5"
                        step="0.5"
                        placeholder="Enter number of days"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        Upload Document (PDF){" "}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 transition-all duration-200">
                        <input
                          type="file"
                          name="attachments"
                          onChange={handleFileChange}
                          accept=".pdf"
                          required
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          {formData.attachments ? (
                            <>
                              <svg
                                className="w-12 h-12 text-green-500 mb-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <p className="text-sm font-medium text-gray-900">
                                {formData.attachments.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Click to change file
                              </p>
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-12 h-12 text-gray-400 mb-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                              </svg>
                              <p className="text-sm text-gray-600">
                                <span className="font-semibold text-teal-600">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                PDF files only (max 10MB)
                              </p>
                            </>
                          )}
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-gray-900 text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200 flex items-center justify-center group"
                    >
                      Submit Application
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : currentView === "admin" ? (
            // Admin Portal View
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                MOIC Portal - Leave Applications
              </h2>

              {/* Tab Navigation */}
              <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button
                  onClick={() => setAdminTab("pending")}
                  className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
                    adminTab === "pending"
                      ? "border-teal-600 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Pending Applications ({pendingApplications.length})
                </button>
                <button
                  onClick={() => setAdminTab("archived")}
                  className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
                    adminTab === "archived"
                      ? "border-teal-600 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Archived Applications ({archivedApplications.length})
                </button>
              </div>

              {/* Applications List */}
              <div className="space-y-6">
                {(adminTab === "pending"
                  ? pendingApplications
                  : archivedApplications
                ).map((app) => (
                  <div
                    key={app.id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
                  >
                    {/* Employee Info Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 pb-4 border-b border-gray-100">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {app.employeeName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {app.employeeName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              ID: {app.employeeId} • {app.department}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 lg:mt-0">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            app.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : app.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                    </div>

                    {/* Leave Details */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Leave Type</p>
                        <p className="font-semibold text-gray-900">
                          {app.leaveType}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Subject</p>
                        <p className="font-semibold text-gray-900">
                          {app.subject}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold text-gray-900">
                          {app.fromDate} - {app.toDate} ({app.numberOfDays}{" "}
                          days)
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Submitted On</p>
                        <p className="font-semibold text-gray-900">
                          {app.submittedDate}
                        </p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-700 mb-3">
                        Approval Status
                      </p>
                      <div className="relative">
                        <div className="absolute left-0 top-5 w-full h-0.5 bg-gray-200"></div>
                        <div
                          className="absolute left-0 top-5 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-600 transition-all duration-500"
                          style={{
                            width: `${
                              app.currentStage === 1
                                ? "0%"
                                : app.currentStage === 2
                                ? "33.33%"
                                : app.currentStage === 3
                                ? "66.66%"
                                : "100%"
                            }`,
                          }}
                        ></div>
                        <div className="relative flex justify-between">
                          {[
                            { stage: 1, label: "Applied" },
                            { stage: 2, label: "MOIC" },
                            { stage: 3, label: "Civil Surgeon" },
                            { stage: 4, label: "Health Dept." },
                          ].map((item) => (
                            <div
                              key={item.stage}
                              className="flex flex-col items-center"
                            >
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  app.currentStage >= item.stage
                                    ? "bg-gradient-to-br from-teal-500 to-cyan-600 text-white"
                                    : "bg-gray-200 text-gray-400"
                                } transition-all duration-300`}
                              >
                                {app.currentStage > item.stage ? (
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : (
                                  <span className="text-sm font-semibold">
                                    {item.stage}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs mt-2 text-gray-600 text-center">
                                {item.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Only show for Pending */}
                    {app.status === "Pending" && (
                      <div className="flex gap-3 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => handleApprove(app.id)}
                          className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(app.id)}
                          className="flex-1 bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {(adminTab === "pending"
                ? pendingApplications
                : archivedApplications
              ).length === 0 && (
                <div className="text-center py-12">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No applications found
                  </h3>
                  <p className="text-gray-500">
                    {adminTab === "pending"
                      ? "All applications have been processed"
                      : "No archived applications yet"}
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
