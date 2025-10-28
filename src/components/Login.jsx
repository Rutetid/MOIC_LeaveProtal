import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const roles = [
    {
      id: "doctor",
      title: "Doctor Login",
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
    },
    {
      id: "moic",
      title: "MOIC Login",
      icon: (
        <svg
          className="w-8 h-8"
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
    },
    {
      id: "cs",
      title: "Civil Surgeon (CS) Login",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6"
          />
        </svg>
      ),
    },
    {
      id: "practitioner",
      title: "Practitioner Login",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
  ];

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setShowLoginForm(true);
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (password === "1234" && username === selectedRole.id) {
      onLogin(selectedRole.id);
      // Redirect based on role
      if (selectedRole.id === "moic" || selectedRole.id === "cs") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError("Invalid username or password");
    }
  };

  const handleBack = () => {
    setShowLoginForm(false);
    setSelectedRole(null);
    setUsername("");
    setPassword("");
    setError("");
  };

  if (showLoginForm && selectedRole) {
    return (
      <>
        <Navbar isLoginPage={true} />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 pt-32">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-black mb-2">
                  {selectedRole.title.replace(" Login", "")} Login
                </h1>
                <p className="text-gray-600">
                  Enter your credentials to continue
                </p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Login as {selectedRole.title.replace(" Login", "")}
                </button>
              </form>

              <div className="mt-6 text-center flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Role Selection
                </button>
                <button className="text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors">
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar isLoginPage={true} />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 pt-32">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-black mb-2">
                Login to Leave portal
              </h1>
              <p className="text-gray-600">Select your role to continue</p>
            </div>

            <div className="space-y-3">
              {roles.map((role, index) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleClick(role)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 bg-white border-gray-300 text-black hover:border-black"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-50">
                      <div className="text-gray-600">{role.icon}</div>
                    </div>
                    <span className="font-semibold text-lg">
                      {role.title.replace(" Login", "")}
                    </span>
                  </div>
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ))}
            </div>

            {/* <div className="mt-6 text-center">
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center gap-2 mx-auto transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </button>
            </div> */}
          </div>

          {/* <p className="text-center text-gray-500 text-sm mt-6">
            Serving Citizens of Bihar
          </p> */}
        </div>
      </div>
    </>
  );
};

export default Login;
