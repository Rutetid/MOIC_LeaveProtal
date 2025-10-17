import React, { useState } from "react";

const AdminPortal = ({
  adminTab,
  setAdminTab,
  pendingApplications,
  archivedApplications,
  handleApprove,
  handleReject,
  userRole,
}) => {
  const [selectedApplication, setSelectedApplication] = useState(null);

  const portalTitle =
    userRole === "moic" ? "MOIC Portal" : "Civil Surgeon Portal";
  const portalDescription =
    userRole === "moic"
      ? "Review and approve applications before Civil Surgeon"
      : "Review applications approved by MOIC";

  // Filter applications based on role
  const filteredPendingApplications = pendingApplications.filter((app) => {
    if (userRole === "moic") {
      return app.currentStage === 1; // MOIC sees applications at stage 1
    } else if (userRole === "cs") {
      return app.currentStage === 2; // CS sees applications at stage 2 (approved by MOIC)
    }
    return false;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <>
      <div>
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
            Pending Applications ({filteredPendingApplications.length})
          </button>
          <button
            onClick={() => setAdminTab("archived")}
            className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
              adminTab === "archived"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Archived Applications ({archivedApplications.length})
          </button>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(adminTab === "pending"
            ? filteredPendingApplications
            : archivedApplications
          ).map((app) => (
            <div
              key={app.id}
              onClick={() => setSelectedApplication(app)}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-gray-300"
            >
              {/* Employee Info */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {app.employeeName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {app.employeeName}
                    </h3>
                    <p className="text-xs text-gray-500">{app.employeeId}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>
              </div>

              {/* Leave Details */}
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {app.leaveType}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {app.subject}
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
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
                  <span>
                    {app.fromDate} - {app.toDate}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{app.numberOfDays} days</span>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-xs text-gray-500">{app.department}</div>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(adminTab === "pending"
          ? filteredPendingApplications
          : archivedApplications
        ).length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
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
            <p className="text-gray-500 text-lg mb-2">No applications found</p>
            <p className="text-gray-400 text-sm">
              {adminTab === "pending"
                ? "All applications have been processed"
                : "No archived applications yet"}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
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
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl">
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
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
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

            {/* Modal Footer with Actions */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl">
              {selectedApplication.status === "Pending" ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleApprove(selectedApplication.id);
                      setSelectedApplication(null);
                    }}
                    className="flex-1 bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
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
                    className="flex-1 bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
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
                  className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
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
