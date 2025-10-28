import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const LandingPage = ({ handleLogout, userRole, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        handleLogout={handleLogout}
        userRole={userRole}
        isLoginPage={!isLoggedIn}
      />

      {/* Main Content */}
      <div className="pt-42 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-6">
            {/* Heading */}
            <h1 className="text-5xl font-bold text-gray-900">
              MOIC Leave Portal
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mt-10">
              Streamlined multi-stage leave approval for healthcare staff.
              Manage leave applications efficiently with automated workflows and
              role-based approvals.
            </p>

            {/* Primary Button */}
            <div className="pt-12">
              <button
                onClick={handleDashboardClick}
                className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                {isLoggedIn ? "Go to Dashboard" : "Login to Continue"}
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Easy Application
              </h3>
              <p className="text-gray-600 text-sm">
                Submit leave applications with just a few clicks. Choose from
                multiple leave types and track your requests in real-time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Multi-Stage Approval
              </h3>
              <p className="text-gray-600 text-sm">
                Automated workflow through MOIC, Civil Surgeon, and Health
                Department stages for transparent approval process.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Real-Time Tracking
              </h3>
              <p className="text-gray-600 text-sm">
                Monitor your application status at every stage. Get instant
                updates on approvals and stay informed throughout the process.
              </p>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 w-2/3 flex justify-center mx-auto">
            <div className=" gap-8">
              {/* Left Column */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  How It Works
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-semibold">
                        1
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Submit Application
                      </h4>
                      <p className="text-sm text-gray-600">
                        Fill out the leave form with your details, dates, and
                        reason for leave.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-semibold">
                        2
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        MOIC Review
                      </h4>
                      <p className="text-sm text-gray-600">
                        Your application is reviewed by the Medical Officer
                        In-Charge for initial approval.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-semibold">
                        3
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Civil Surgeon Approval
                      </h4>
                      <p className="text-sm text-gray-600">
                        After MOIC approval, the Civil Surgeon reviews your
                        application.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-semibold">
                        4
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Final Approval
                      </h4>
                      <p className="text-sm text-gray-600">
                        Health Department provides final approval and your leave
                        is confirmed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              {/* <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Available Leave Types
                </h2>
                <div className="space-y-2">
                  {[
                    "Earned Leave (EL)",
                    "Casual Leave (CL)",
                    "Maternity Leave",
                    "Paternity Leave",
                    "Childcare Leave",
                    "Restricted Holiday",
                    "Medical Leave",
                    "Half Day Leave",
                    "Compensatory Off",
                  ].map((leaveType, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <svg
                        className="w-4 h-4 text-gray-900"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{leaveType}</span>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-6">
              Access your dashboard to view or submit leave applications.
            </p>
            <button
              onClick={handleDashboardClick}
              className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              {isLoggedIn ? "Go to Dashboard" : "Login to Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
