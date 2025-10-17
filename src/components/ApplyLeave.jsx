import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ApplyLeave = ({
  formData,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  leaveTypes,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Sidebar - Info Cards */}
      <div className="space-y-6">
        {/* Leave Info Card */}
        <div className="bg-white rounded-2xl p-6 text-black shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Leave Information</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Please fill out the form carefully. Ensure all required fields are
            completed before submission. Your application will be reviewed by
            the medical administration.
          </p>
        </div>

        {/* Guidelines Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
              <svg
                className="w-5 h-5 text-teal-600"
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
            <h3 className="text-lg font-semibold text-gray-900">Guidelines</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-teal-500 mr-2">•</span>
              <span>Submit applications at least 3 days in advance</span>
            </li>
            <li className="flex items-start">
              <span className="text-teal-500 mr-2">•</span>
              <span>Medical certificate required for sick leave</span>
            </li>
            <li className="flex items-start">
              <span className="text-teal-500 mr-2">•</span>
              <span>Maximum file size: 10MB (PDF only)</span>
            </li>
            <li className="flex items-start">
              <span className="text-teal-500 mr-2">•</span>
              <span>Check your dashboard for application status</span>
            </li>
          </ul>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
              <svg
                className="w-5 h-5 text-cyan-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Contact HR for any queries regarding leave applications.
          </p>
          <a
            href="mailto:hr@hospital.com"
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            hr@hospital.com
          </a>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-900 p-6">
            <div className="flex items-center text-white">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="black"
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
              <div>
                <h2 className="text-2xl font-bold">Leave Application</h2>
                <p className="text-teal-50 text-sm">
                  Fill in the details below
                </p>
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
                Type of Leave <span className="text-red-500 ml-1">*</span>
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
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
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
            <div className="grid md:grid-cols-2 gap-6">
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
                  selected={formData.fromDate}
                  onChange={(date) =>
                    handleInputChange({
                      target: { name: "fromDate", value: date },
                    })
                  }
                  dateFormat="dd/MM/yy"
                  onKeyDown={(e) => e.preventDefault()}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                  placeholderText="Select start date"
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
                  selected={formData.toDate}
                  onChange={(date) =>
                    handleInputChange({
                      target: { name: "toDate", value: date },
                    })
                  }
                  dateFormat="dd/MM/yy"
                  onKeyDown={(e) => e.preventDefault()}
                  required
                  minDate={formData.fromDate}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                  placeholderText="Select end date"
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Number of Days <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                name="numberOfDays"
                value={formData.numberOfDays}
                onChange={handleInputChange}
                step="0.5"
                min="0.5"
                required
                placeholder="Enter number of days (e.g., 0.5 for half day)"
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
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
                Attachments (Optional)
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  name="attachments"
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  {formData.attachments ? (
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-8 h-8 text-teal-600"
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
                      <span className="text-sm text-gray-600">
                        {formData.attachments?.name || 'File selected'}
                      </span>
                    </div>
                  ) : (
                    <>
                      <svg
                        className="w-10 h-10 mb-3 text-gray-400"
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
  );
};

export default ApplyLeave;
