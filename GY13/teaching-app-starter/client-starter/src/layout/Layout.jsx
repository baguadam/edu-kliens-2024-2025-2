import { Route, Routes } from "react-router";
import Navbar from "../components/Navbar";
import StudentDetails from "../features/StudentDetails";
import StudentForm from "../features/StudentForm";
import StudentList from "../features/StudentList";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/new" element={<StudentForm />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="*" element={<StudentList />} />
      </Routes>
    </>
  );
}
