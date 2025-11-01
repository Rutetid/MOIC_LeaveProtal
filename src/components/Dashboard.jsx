import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = ({ applications, userRole }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [activeSidebar, setActiveSidebar] = useState("dashboard");

  const getUserInfo = () => {
    const userInfo = {
      doctor: {
        name: "Dr. User",
        id: "EMP999",
        department: "General Medicine",
      },
      practitioner: {
        name: "Practitioner User",
        id: "EMP998",
        department: "Nursing",
      },
      moic: { name: "MOIC User", id: "MOIC001", department: "Administration" },
      cs: { name: "CS User", id: "CS001", department: "Administration" },
    };
    return (
      userInfo[userRole] || {
        name: "User",
        id: "EMP000",
        department: "General",
      }
    );
  };

  const currentUser = getUserInfo();

  const allApplications = applications;
  const pendingApplications = applications.filter(
    (app) =>
      app.status === "Pending" ||
      app.status === "MOIC" ||
      app.status === "Civil Surgeon" ||
      app.status === "Health Department"
  );
  const acceptedApplications = applications.filter(
    (app) => app.status === "Approved" || app.status === "Accepted"
  );
  const rejectedApplications = applications.filter(
    (app) => app.status === "Rejected"
  );

  const getCurrentTabApplications = () => {
    switch (activeTab) {
      case "all":
        return allApplications;
      case "pending":
        return pendingApplications;
      case "accepted":
        return acceptedApplications;
      case "rejected":
        return rejectedApplications;
      default:
        return allApplications;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
      case "Accepted":
        return "bg-gray-900 text-white";
      case "Pending":
        return "bg-gray-200 text-gray-900";
      case "Rejected":
        return "bg-gray-700 text-white";
      case "Health Department":
      case "Civil Surgeon":
      case "MOIC":
        return "bg-gray-600 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="flex gap-6">
        <Sidebar
          userInfo={currentUser}
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
              id: "apply-leave",
              label: "Apply Leave",
              isLink: true,
              path: "/apply-leave",
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              ),
            },
            {
              id: "statistics",
              label: "Statistics",
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
              badge:
                acceptedApplications.length > 0
                  ? acceptedApplications.length
                  : null,
            },
            {
              id: "profile",
              label: "Profile",
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              ),
              onClick: setActiveSidebar,
              badge:
                rejectedApplications.length > 0
                  ? rejectedApplications.length
                  : null,
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
            {
              label: "Accepted",
              value: acceptedApplications.length,
              className: "text-gray-900",
            },
          ]}
        />

        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              All Leave Applications
            </h2>
            <p className="text-gray-600">
              View and track your leave applications
            </p>
          </div>

          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
                activeTab === "all"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              All ({allApplications.length})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
                activeTab === "pending"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Pending ({pendingApplications.length})
            </button>
            <button
              onClick={() => setActiveTab("accepted")}
              className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
                activeTab === "accepted"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Accepted ({acceptedApplications.length})
            </button>
            <button
              onClick={() => setActiveTab("rejected")}
              className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
                activeTab === "rejected"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Rejected ({rejectedApplications.length})
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
                  {/* Left Section - Application Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900 text-base">
                          {currentUser.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {currentUser.id}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {currentUser.department}
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
              <p className="text-gray-500 text-lg mb-2 font-semibold">
                No {activeTab} applications
              </p>
              <p className="text-gray-400 text-sm">
                {activeTab === "all"
                  ? "Start by applying for a leave"
                  : `You don't have any ${activeTab} applications yet`}
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
              {/* Application Info */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedApplication.leaveType}
                    </h4>
                    <p className="text-gray-600">
                      {selectedApplication.subject}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(
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
                    className="absolute left-0 top-5 h-0.5 bg-black transition-all duration-500"
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
                              ? "bg-black border-black text-white"
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

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end rounded-b-2xl">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
