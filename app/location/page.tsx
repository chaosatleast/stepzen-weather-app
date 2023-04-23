import SidePanel from "@/components/SidePanel";
import Dashboard from "@/components/Dashboard";
import React from "react";

function Location() {
  return (
    <div className="flex ">
      {/* Side Panel */}
      <div className="">
        <SidePanel />
      </div>
      {/* Content */}
      <div className="p-5 lg:flex-1">
        <Dashboard />
      </div>
    </div>
  );
}

export default Location;
