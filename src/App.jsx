import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import Navigation from "./Navigation/Navigation";
import AddStudent from "./Pages/AddStudent";
import ManageStudent from "./Pages/ManageStudents";
import EditStudent from "./Pages/EditStudent";
import ViewStudent from "./Pages/ViewStudent";
import { useSelector } from "react-redux";

function App() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  console.log(loggedIn)

  return (
    <div className="App">
      {loggedIn && (
        <div className="navBar">
          <Navigation />
        </div>
      )}

      <div className="body">
        <Routes>
          {!loggedIn && (
            <Route
              path="/manage-students"
              element={<Navigate to="/login" replace />}
            />
          )}
          {!loggedIn && <Route path="/login" element={<Login />} />}
          {!loggedIn && (
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}
          {!loggedIn && (
            <Route
              path="/add-student"
              element={<Navigate to="/login" replace />}
            />
          )}
          {loggedIn && (
            <Route path="/login" element={<Navigate to="/" replace />} />
          )}
          {loggedIn && (
            <Route
              path="/"
              element={<Navigate to="/manage-students" replace />}
            />
          )}
          {loggedIn && <Route path="/add-student" element={<AddStudent />} />}
          {loggedIn && (
            <Route path="/manage-students" element={<ManageStudent />} />
          )}
          {loggedIn && (
            <Route path="/edit-student/:id" element={<EditStudent />} />
          )}
          {loggedIn && (
            <Route path="/view-student/:id" element={<ViewStudent />} />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
