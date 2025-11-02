import React, { useState } from "react";
import Sidebar from "./Sidebar";

const AdminPortal = ({
  adminTab,
  setAdminTab,
  allApplications,
  handleApprove,
  handleReject,
  userRole,
}) => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [activeSidebar, setActiveSidebar] = useState("dashboard");

  const portalTitle =
    userRole === "moic" ? "MOIC Portal" : "Civil Surgeon Portal";
  const portalDescription =
    userRole === "moic"
      ? "Review and approve applications before Civil Surgeon"
      : "Review applications approved by MOIC";

  const getUserInfo = () => {
    const userInfo = {
      moic: { name: "MOIC User", id: "MOIC001", department: "Administration" },
      cs: { name: "CS User", id: "CS001", department: "Administration" },
    };
    return (
      userInfo[userRole] || {
        name: "Admin User",
        id: "ADMIN001",
        department: "Administration",
      }
    );
  };

  const currentUser = getUserInfo();

  // Filter applications based on role and status
  const pendingApplications = allApplications.filter((app) => {
    if (userRole === "moic") {
      return app.currentStage === 1 && app.status === "Pending"; // MOIC sees stage 1 pending
    } else if (userRole === "cs") {
      return app.currentStage === 2 && app.status === "Pending"; // CS sees stage 2 (MOIC-approved, now pending for CS)
    }
    return false;
  });

  const acceptedApplications = allApplications.filter((app) => {
    if (userRole === "moic") {
      return app.moicApproved && app.currentStage >= 2; // MOIC approved applications (moved forward)
    } else if (userRole === "cs") {
      return app.csApproved && app.currentStage >= 3; // CS approved applications (moved forward)
    }
    return false;
  });

  const rejectedApplications = allApplications.filter((app) => {
    return app.status === "Rejected"; // All rejected applications
  });

  const archivedApplications = allApplications.filter((app) => {
    return app.status === "Archived" && app.currentStage === 4; // Final archived applications
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-gray-900 text-white";
      case "Pending":
        return "bg-gray-200 text-gray-900";
      case "Rejected":
        return "bg-gray-700 text-white";
      case "Archived":
        return "bg-gray-900 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCurrentTabApplications = () => {
    let apps = [];
    switch (adminTab) {
      case "pending":
        apps = pendingApplications;
        break;
      case "accepted":
        apps = acceptedApplications;
        break;
      case "rejected":
        apps = rejectedApplications;
        break;
      case "archived":
        apps = archivedApplications;
        break;
      default:
        apps = [];
    }
    
    if (searchQuery.trim() === "") {
      return apps;
    }
    
    return apps.filter(
      (app) =>
        app.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <>
      <div className="flex gap-6">
        <Sidebar
          userInfo={{
            name: userRole === "moic" ? "MOIC User" : "CS User",
            id: userRole === "moic" ? "MOIC001" : "CS001",
          }}
          activeSidebar={activeSidebar}
          setActiveSidebar={setActiveSidebar}
          navigationItems={[
            {
              id: "dashboard",
              label: "Dashboard",
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              ),
              onClick: setActiveSidebar,
              badge:
                pendingApplications.length > 0
                  ? pendingApplications.length
                  : null,
            },
            {
              id: "analytics",
              label: "Analytics",
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              ),
              onClick: setActiveSidebar,
            },
            {
              id: "reports",
              label: "Reports",
              icon: (
                <svg
                  className="w-5 h-5"
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
              ),
              onClick: setActiveSidebar,
            },
            {
              id: "settings",
              label: "Settings",
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ),
              onClick: setActiveSidebar,
            },
          ]}
          statsItems={[
            {
              label: "Total",
              value: allApplications.length,
              className: "text-gray-900",
            },

            {
              label: "Pending",
              value: pendingApplications.length,
              className: "text-gray-600",
            },
            // {
            //   label: "Accepted",
            //   value: acceptedApplications.length,
            //   className: "text-gray-900",
            // },
            // {
            //   label: "Rejected",
            //   value: rejectedApplications.length,
            //   className: "text-gray-700",
            // },
            // {
            //   label: "Archived",
            //   value: archivedApplications.length,
            //   className: "text-gray-900",
            // },
          ]}
        />

        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {portalTitle}
            </h2>
            <p className="text-gray-600">{portalDescription}</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setAdminTab("pending")}
              className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
                adminTab === "pending"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Pending ({pendingApplications.length})
            </button>
            <button
              onClick={() => setAdminTab("accepted")}
              className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
                adminTab === "accepted"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Accepted ({acceptedApplications.length})
            </button>
            <button
              onClick={() => setAdminTab("rejected")}
              className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
                adminTab === "rejected"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Rejected ({rejectedApplications.length})
            </button>
            <button
              onClick={() => setAdminTab("archived")}
              className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
                adminTab === "archived"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Archived ({archivedApplications.length})
            </button>
          </div>

          {/* Applications List */}
          <div className="space-y-3">
            {getCurrentTabApplications().map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApplication(app)}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-gray-400"
              >
                <div className="flex items-center justify-between">
                  {/* Left Section - Employee Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {app.employeeName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900 text-base">
                          {app.employeeName}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {app.employeeId}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {app.department}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="font-medium text-gray-900">
                          {app.leaveType}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="line-clamp-1">{app.subject}</span>
                      </div>
                    </div>
                  </div>
          {/* Applications List */}
          <div className="space-y-3">
            {getCurrentTabApplications().map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApplication(app)}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-gray-400"
              >
                <div className="flex items-center justify-between">
                  {/* Left Section - Employee Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {app.employeeName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900 text-base">
                          {app.employeeName}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {app.employeeId}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {app.department}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="font-medium text-gray-900">
                          {app.leaveType}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="line-clamp-1">{app.subject}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section - Date Info */}
                  <div className="flex items-center gap-6 px-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Duration</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {app.fromDate} - {app.toDate}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Days</p>
                      <p className="font-bold text-gray-900 text-lg">
                        {app.numberOfDays}
                      </p>
                    </div>
                  </div>
                  {/* Middle Section - Date Info */}
                  <div className="flex items-center gap-6 px-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Duration</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {app.fromDate} - {app.toDate}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Days</p>
                      <p className="font-bold text-gray-900 text-lg">
                        {app.numberOfDays}
                      </p>
                    </div>
                  </div>

                  {/* Right Section - Status & Action */}
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-4 py-1.5 rounded-md text-xs font-semibold ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
                  {/* Right Section - Status & Action */}
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-4 py-1.5 rounded-md text-xs font-semibold ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {getCurrentTabApplications().length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
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
              <p className="text-gray-900 text-lg font-semibold mb-1">
                No applications found
              </p>
              <p className="text-gray-500 text-sm">
                {adminTab === "pending"
                  ? "All applications have been processed"
                  : adminTab === "accepted"
                  ? "No accepted applications yet"
                  : adminTab === "rejected"
                  ? "No rejected applications yet"
                  : "No archived applications yet"}
              </p>
            </div>
          )}
        </div>
          {/* Empty State */}
          {getCurrentTabApplications().length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
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
              <p className="text-gray-900 text-lg font-semibold mb-1">
                No applications found
              </p>
              <p className="text-gray-500 text-sm">
                {adminTab === "pending"
                  ? "All applications have been processed"
                  : adminTab === "accepted"
                  ? "No accepted applications yet"
                  : adminTab === "rejected"
                  ? "No rejected applications yet"
                  : "No archived applications yet"}
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedApplication && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedApplication(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-xl font-bold text-gray-900">
                Application Details
              </h3>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Employee Info */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  {selectedApplication.employeeName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">
                    {selectedApplication.employeeName}
                  </h4>
                  <p className="text-gray-600">
                    {selectedApplication.employeeId} •{" "}
                    {selectedApplication.department}
                  </p>
                </div>
              </div>

              {/* Leave Details */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedApplication.leaveType}
                    </h5>
                    <p className="text-gray-600">
                      {selectedApplication.subject}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-md text-sm font-semibold ${getStatusColor(
                      selectedApplication.status
                    )}`}
                  >
                    {selectedApplication.status}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">From Date</p>
                    <p className="font-semibold text-gray-900">
                      {selectedApplication.fromDate}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">To Date</p>
                    <p className="font-semibold text-gray-900">
                      {selectedApplication.toDate}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Number of Days</p>
                    <p className="font-semibold text-gray-900">
                      {selectedApplication.numberOfDays} days
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Submitted On</p>
                    <p className="font-semibold text-gray-900">
                      {selectedApplication.submittedDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-8">
                <h5 className="text-lg font-semibold text-gray-900 mb-4">
                  Application Timeline
                </h5>
                <div className="relative">
                  <div className="absolute left-0 top-5 w-full h-0.5 bg-gray-200"></div>
                  <div
                    className="absolute left-0 top-5 h-0.5 bg-gray-900 transition-all duration-500"
                    style={{
                      width: `${
                        selectedApplication.currentStage === 1
                          ? "0%"
                          : selectedApplication.currentStage === 2
                          ? "33.33%"
                          : selectedApplication.currentStage === 3
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
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                            selectedApplication.currentStage >= item.stage
                              ? "bg-gray-900 border-gray-900 text-white"
                              : "bg-white border-gray-300 text-gray-400"
                          } transition-all duration-300`}
                        >
                          {selectedApplication.currentStage > item.stage ? (
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
            </div>

            {/* Modal Footer with Actions */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl">
              {adminTab === "pending" &&
              selectedApplication.status === "Pending" &&
              ((userRole === "moic" &&
                selectedApplication.currentStage === 1) ||
                (userRole === "cs" &&
                  selectedApplication.currentStage === 2)) ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleApprove(selectedApplication.id);
                      setSelectedApplication(null);
                    }}
                    className="flex-1 bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
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
                    onClick={() => {
                      handleReject(selectedApplication.id);
                      setSelectedApplication(null);
                    }}
                    className="flex-1 bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
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
              ) : (
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPortal;
