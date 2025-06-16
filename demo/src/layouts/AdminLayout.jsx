import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";

export default function AdminLayout() {
  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="flex-grow-1 bg-warning-subtle p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
