import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setMenuClose } from "../redux/actions";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  Cog6ToothIcon,
  ChartPieIcon,
  UserGroupIcon,
  UserCircleIcon,
  UsersIcon,
  PlusCircleIcon,
  ArrowUpTrayIcon,
  ViewColumnsIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/solid";

export default function DashboardMenuContent() {
  const Admindata = useSelector((state) => state.auth.user.user);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const dispatch  = useDispatch()
  const handleTabClick = (path) => {
    dispatch(setMenuClose(false));
    setActiveTab(path);
  };

  const isTabActive = (path) => {
    return activeTab === path;
  };

  return (
    <Card className="h-full w-full p-3 bg-white mb-6 shadow-xl rounded-lg ">
      <div className="mb-4">
        <Typography variant="h5" color="gray" className="font-semibold">
          School Management
        </Typography>
      </div>
      <List className="">
        <hr className="my-3 border-t-2 border-gray-900" />
        <div className="text-sm font-semibold text-gray-600">STUDENT</div>

        <Link to="/admindashboard">
          <ListItem
            className={`hover:bg-gray-900 hover:text-white ${
              isTabActive("/admindashboard") && "bg-gray-900 text-white"
            }`}
            onClick={() => handleTabClick("/admindashboard")}
          >
            <ListItemPrefix>
              <ChartPieIcon className="h-5 w-5" />
            </ListItemPrefix>
            Biodata Graphs
          </ListItem>
        </Link>
        <Link to="/admindashboard/tables">
          <ListItem
            className={`hover:bg-gray-900 hover:text-white ${
              isTabActive("/admindashboard/tables") && "bg-gray-900 text-white"
            }`}
            onClick={() => handleTabClick("/admindashboard/tables")}
          >
            <ListItemPrefix>
              <ViewColumnsIcon className="h-5 w-5" />
            </ListItemPrefix>
            Biodata Tables
          </ListItem>
        </Link>
        <Link to="/admindashboard/studentdata">
          <ListItem
            className={`hover:bg-gray-900 hover:text-white ${
              isTabActive("/admindashboard/studentdata") &&
              "bg-gray-900 text-white"
            }`}
            onClick={() => handleTabClick("/admindashboard/studentdata")}
          >
            <ListItemPrefix>
              <AcademicCapIcon className="h-5 w-5" />
            </ListItemPrefix>
            Students Biodata
          </ListItem>
        </Link>

        <Link to="/staff/marks">
          <ListItem
            className={`hover:bg-gray-900 hover:text-white ${
              isTabActive("/staff/marks") && "bg-gray-900 text-white"
            }`}
            onClick={() => handleTabClick("/staff/marks")}
          >
            <ListItemPrefix>
              <DocumentTextIcon className="h-5 w-5" />
            </ListItemPrefix>
            Marks Detail
          </ListItem>
        </Link>

        <Link to="/staff/graph">
          <ListItem
            className={`hover:bg-gray-900 hover:text-white ${
              isTabActive("/staff/graph") && "bg-gray-900 text-white"
            }`}
            onClick={() => handleTabClick("/staff/graph")}
          >
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Marks Graph
          </ListItem>
        </Link>
        <Link to="/Reportcard">
          <ListItem
            className={`hover:bg-gray-900 hover:text-white ${
              isTabActive("/Reportcard") && "bg-gray-900 text-white"
            }`}
            onClick={() => handleTabClick("/Reportcard")}
          >
            <ListItemPrefix>
              <DocumentTextIcon className="h-5 w-5" />
            </ListItemPrefix>
            Report Card
          </ListItem>
        </Link>

        <hr className="my-3 border-t-2 border-gray-900" />
        <div className="text-sm font-semibold text-gray-600">MANAGE</div>

        <>
          {Admindata.role === "admin" && (
            <>
              <Link to="/admindashboard/teacherdata">
                <ListItem
                  className={`hover:bg-gray-900 hover:text-white ${
                    isTabActive("/admindashboard/teacherdata") &&
                    "bg-gray-900 text-white"
                  }`}
                  onClick={() => handleTabClick("/admindashboard/teacherdata")}
                >
                  <ListItemPrefix>
                    <UserGroupIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Assign Teachers
                </ListItem>
              </Link>
              {/* <Link to="/salary">
                <ListItem
                  className={`hover:bg-gray-900 hover:text-white ${
                    isTabActive("/admindashboard/teacherdata") &&
                    "bg-gray-900 text-white"
                  }`}
                  onClick={() => handleTabClick("/salary")}
                >
                  <ListItemPrefix>
                    <CurrencyRupeeIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Pay Salaries
                </ListItem>
              </Link> */}
              {/* <Link to="/invoice">
                <ListItem
                  className={`hover:bg-gray-900 hover:text-white ${
                    isTabActive("/admindashboard/teacherdata") &&
                    "bg-gray-900 text-white"
                  }`}
                  onClick={() => handleTabClick("/invoice")}
                >
                  <ListItemPrefix>
                    <DocumentTextIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Invoice
                </ListItem>
              </Link> */}
            </>
          )}

          <Link to="/subject-marks">
            <ListItem
              className={`hover:bg-gray-900 hover:text-white ${
                isTabActive("/subject-marks") && "bg-gray-900 text-white"
              }`}
              onClick={() => handleTabClick("/subject-marks")}
            >
              <ListItemPrefix>
                <ArrowUpTrayIcon className="h-5 w-5" />
              </ListItemPrefix>
              Upload marks
            </ListItem>
          </Link>
          {Admindata.role === "admin" && (
            <Link to="/editclasses">
              <ListItem
                className={`hover:bg-gray-900 hover:text-white ${
                  isTabActive("/editclasses") && "bg-gray-900 text-white"
                }`}
                onClick={() => handleTabClick("/editclasses")}
              >
                <ListItemPrefix>
                  <ArrowUpTrayIcon className="h-5 w-5" />
                </ListItemPrefix>
                Edit Class
              </ListItem>
            </Link>
          )}
          <hr className="my-3 border-t-2 border-gray-900" />
          <div className="text-sm font-semibold text-gray-600">REGISTER</div>

          <Link to="/biodata">
            <ListItem
              className={`hover:bg-gray-900 hover:text-white ${
                isTabActive("/biodata") && "bg-gray-900 text-white"
              }`}
              onClick={() => handleTabClick("/biodata")}
            >
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Student
            </ListItem>
          </Link>

          {Admindata.role === "admin" && (
            <Link to="/create-teacher">
              <ListItem
                className={`hover:bg-gray-900 hover:text-white ${
                  isTabActive("/create-tacher") && "bg-gray-900 text-white"
                }`}
                onClick={() => handleTabClick("/create-teacher")}
              >
                <ListItemPrefix>
                  <UsersIcon className="h-5 w-5" />
                </ListItemPrefix>
                Teacher
              </ListItem>
            </Link>
          )}
          <hr className="my-3 border-t-2 border-gray-900" />
          <div className="text-sm font-semibold text-gray-600">CREATE</div>

          {Admindata.role === "admin" && (
            <Link to="/create-class">
              <ListItem
                className={`hover:bg-gray-900 hover:text-white ${
                  isTabActive("/create-class") && "bg-gray-900 text-white"
                }`}
                onClick={() => handleTabClick("/create-class")}
              >
                <ListItemPrefix>
                  <PlusCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Create Class
              </ListItem>
            </Link>
          )}
        </>
        <ListItem
          className={`hover:bg-gray-900 hover:text-white ${
            isTabActive("/") && "bg-gray-900 text-white"
          }`}
          onClick={() => handleTabClick("/")}
        >
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
      </List>
    </Card>
  );
}
