import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ handleLogout, userRole, isLoginPage = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = userRole === "moic" || userRole === "cs";

  return (
    <nav className="bg-gradient-to-r from-black/90 via-black/80 to-black/90 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Title */}
          <div
            className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center">
              <svg
                className="w-10 h-10 text-white"
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
                className="w-8 h-8 text-white -ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Medical Leave Portal
              </h1>
              <p className="text-teal-100 text-sm">
                Healthcare Staff Management
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-2">
            {!isLoginPage && (
              <>
                {isAdmin ? (
                  <button
                    onClick={() =>
                      navigate(userRole === "moic" ? "/moic" : "/cs")
                    }
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                      location.pathname === "/moic" ||
                      location.pathname === "/cs"
                        ? "bg-white text-black/80 shadow-lg"
                        : "text-white hover:bg-white hover:bg-opacity-20 hover:text-black"
                    }`}
                  >
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
                    {userRole === "moic"
                      ? "MOIC Portal"
                      : "Civil Surgeon Portal"}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/dashboard")}
                      className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                        location.pathname === "/dashboard"
                          ? "bg-white text-black/80 shadow-lg"
                          : "text-white hover:bg-white hover:bg-opacity-20 hover:text-black"
                      }`}
                    >
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
                      Dashboard
                    </button>
                    <button
                      onClick={() => navigate("/apply-leave")}
                      className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                        location.pathname === "/apply-leave"
                          ? "bg-white text-black/80 shadow-lg"
                          : "text-white hover:bg-white hover:bg-opacity-20 hover:text-black"
                      }`}
                    >
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
                      Apply Leave
                    </button>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-white hover:bg-red-600 hover:bg-opacity-80"
                >
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </>
            )}
            {isLoginPage && (
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-white hover:bg-white hover:bg-opacity-20 hover:text-black"
                >
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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Login
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-white text-black hover:bg-gray-200"
                >
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
                  Home
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
