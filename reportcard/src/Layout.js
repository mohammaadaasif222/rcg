// Layout.js
import React from "react";
import Admindashboard from "./AdminDashboard/DashboardMenu";
import DashboardHeader from "./AdminDashboard/DashboardHeader";
import Select from "./Feature/Select.js";

const Layout = ({ children, includeSelect, sectioncheck }) => {
  return (
    <>
        <div className="flex p-2 flex-col md:flex-row">
        <div className="ml-2">
          <Admindashboard />
        </div>

        <div className="w-full px-5">
          <DashboardHeader />
          {includeSelect && <Select sectioncheck={sectioncheck}/>}
          {children}
      </div>
      </div>
    </>
  );
};

export default Layout;
