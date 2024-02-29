// App.js
import "./App.css";
import HomePage from "./Feature/HomePage.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./LoginPages/AdminLogin.js";
import Blocks from "./AdminDashboard/Graphs/Blocks.js";
import Tables from "./AdminDashboard/Tables/Tables.js";
import StudentDataManage from "./AdminDashboard/StudentManage/StudentDataManage.js";
import Teacher from "./AdminDashboard/TeacherManage/TeacherAssign.js";
import AdminProfile from "./AdminDashboard/AdminProfile/AdminProfile.js";
import StudentMarks from "./StaffDashboard/StudentMarks.js";
import StudentDataGraph from "./StaffDashboard/StudentDataGraph.js";
import Layout from "./Layout";
import CreateClass from './Forms/CreateClass.js'
import CreateTeacher from './Forms/CreateTeacher.js'
import BioData  from './Forms/BioData.js'
import SubjectMarks from './Forms/SubjectMarks.js'
import EditClasses from "./Forms/EditClass.js";
import TotalMarks from "./StaffDashboard/TotalMarks.js";
import ForgotPassword from "./LoginPages/ForgotPassword.js";
import ResetPassword from "./LoginPages/ResetPassword.js";
import NotFound from "./Feature/NotFound.js";
import StudentDataTable from "./StaffDashboard/StudentDataTable.js";
import Nursery from './Forms/Nursery.js'

function App() {
  const includeSelect = true;
  const sectioncheck = true;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password/:token" element={<ResetPassword />}/>
        <Route path="/adminlogin" element={<AdminLogin />}/>
        <Route path="/admindashboard" element={<Layout includeSelect={includeSelect} ><Blocks /></Layout>} />
        <Route path="/admindashboard/tables" element={<Layout includeSelect={includeSelect}><Tables /></Layout>} />
        <Route path="/admindashboard/studentdata" element={<Layout includeSelect={includeSelect}><StudentDataManage /></Layout>} />
        <Route path="/admindashboard/teacherdata" element={<Layout><Teacher /></Layout>} />
        <Route path="/admindashboard/profile" element={<Layout><AdminProfile /></Layout>} />
        <Route path="/staff/marks" element={<Layout includeSelect={includeSelect} sectioncheck={sectioncheck}><StudentMarks /></Layout>} />
        <Route path="/staff/graph" element={<Layout includeSelect={includeSelect}><StudentDataGraph /></Layout>} />
        <Route path="/create-class" element={<Layout><CreateClass /></Layout>}/>
        <Route path="/create-teacher" element={<Layout><CreateTeacher /></Layout>}/>
        <Route path="/biodata" element={<Layout includeSelect={includeSelect}><BioData /></Layout>}/>
        <Route path="/subject-marks" element={<Layout includeSelect={includeSelect} sectioncheck={sectioncheck}><SubjectMarks /></Layout>}/>
        <Route path="/editclasses" element={<Layout><EditClasses /></Layout>}/>
        <Route path="/Reportcard" element={<Layout includeSelect={includeSelect}><TotalMarks /></Layout>}/>
        <Route path="/StudentDataTable" element={<Layout includeSelect={includeSelect}><StudentDataTable /></Layout>}/>
        <Route path="/nursery" element={<Layout ><Nursery/></Layout>}/>

        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
