import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({
  userInfo,
  navigationItems = [],
  statsItems = [],
  activeSidebar,
  setActiveSidebar,
}) => {
  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-32">
        <div className="mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {userInfo.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {userInfo.name}
              </h3>
              <p className="text-xs text-gray-500">{userInfo.id}</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {navigationItems.map((item, index) => {
            if (item.isLink) {
              return (
                <Link key={index} to={item.path}>
                  <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 bg-gray-700 text-white text-xs font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </Link>
              );
            }

            return (
              <button
                key={index}
                onClick={() => item.onClick && item.onClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                  activeSidebar === item.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-gray-700 text-white text-xs font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {statsItems.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="px-4 py-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Quick Stats</p>
              <div className="space-y-2">
                {statsItems.map((stat, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-xs text-gray-600">{stat.label}</span>
                    <span
                      className={`text-sm font-bold ${
                        stat.className || "text-gray-900"
                      }`}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
