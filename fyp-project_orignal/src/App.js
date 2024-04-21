import React from "react";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SearchDoc from "./components/SearchDoc";
import RegistrationForm from "./components/RegistrationForm";
import Welcome from "./components/Welcome";
import BookAppoinment from "./components/BookAppoinment";
import DocViewProfile from "./components/DocViewProfile";
import UpcommingAppoinment from "./components/UpcommingAppoinment";
import Notfound404 from "./components/Notfound404";
import Comingsoon from "./components/Comingsoon";
import TrustedDoc from "./components/TrustedDoc";
import WritePriscription from "./components/WritePriscription";
import MedicalRecord from "./components/MedicalRecordx";
import MangeLabTests from "./components/MangeLabTests";
import TrustedLab from "./components/TrustedLab";
import Pdfviewer from "./components/Pdfviewer";
import UploadTestrecord from "./components/UploadTestrecord";
import ForgetPass from "./components/ForgetPass";

function App() {
  
  return (
    <>
      <Routes>
      <Route exact path="*" element={< Notfound404/>} />
        <Route exact path="" element={<Navbar />}>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/:user/signin" element={<LoginForm />} />
          <Route exact path="/:user/signup" element={<RegistrationForm />} />
          <Route exact path="/:user/forgot-password" element={<ForgetPass />} />
        </Route>

        <Route
          exact
          path="/welcome/:user/:username/:fullname"
          element={<Dashboard />}
        >
          <Route exact path="" element={<Welcome />} />
          <Route exact path="search" element={<SearchDoc Medicallab={false} />} />
          <Route exact path="searchLab" element={<SearchDoc Medicallab={true} />} />
          <Route exact path="trust" element={<TrustedDoc />} />
          <Route exact path="trustLab" element={<TrustedLab />} />
          <Route exact path="book" element={<BookAppoinment />} />
          <Route exact path="uploadtest" element={<UploadTestrecord />} />
          <Route exact path="noti" element={<UpcommingAppoinment />} />
          <Route exact path="mange_tests" element={<MangeLabTests/>} />
          <Route exact path="comingsoon" element={<Comingsoon />} />
          <Route exact path="record" element={<MedicalRecord/>} />
          <Route exact path="noti/Patientrecord" element={<MedicalRecord/>} />
        </Route>
        <Route exact path="/dic" element={<DocViewProfile />} />
      </Routes>
    </>
  );
}

export default App;
