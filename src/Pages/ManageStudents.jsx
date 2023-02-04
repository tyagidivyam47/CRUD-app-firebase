import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import addClasses from "./AddStudent.module.css";
import classes from "./ManageStudents.module.css";
import viewIcon from "../assets/viewIcon.png";
import editIcon from "../assets/editIcon.png";
import deleteIcon from "../assets/deleteIcon.png";
import fireDB from "../firebase";

const ManageStudent = () => {
  const [date, setDate] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataHandler = async () => {
    const response = await fetch(
      "https://student-crud-6da10-default-rtdb.firebaseio.com/students.json"
    );
    const Data = await response.json();

    // console.log("data ", Data);

    const loadedStudents = [];

    for (const key in Data) {
      await loadedStudents.push({
        id: key,
        firstName: Data[key].firstName,
        middleName: Data[key].middleName,
        lastName: Data[key].lastName,
        class: Data[key].class,
        division: Data[key].division,
        rollNo: Data[key].rollNo,
        address1: Data[key].address1,
        address2: Data[key].address2,
        landmark: Data[key].landmark,
        city: Data[key].city,
        pincode: Data[key].pincode,
      });
    }
    // console.log("loaded ", loadedStudents);
    await setStudents(loadedStudents);
    setLoading(false);
  };

  useEffect(() => {
    const date = new Date();
    let str = "";
    str += date.getDate() + " / ";
    str += date.getMonth() + " / ";
    str += date.getFullYear() + " ";
    str += date.getHours() + ":";
    str += date.getMinutes();
    setDate(str);

    fetchDataHandler();
  }, []);

  const deleteStudentHandler = (id) => {
    // console.log("id is", id);

    if (window.confirm("Are you sure you want to delete this student?")) {
      const fDb = fireDB.database().ref();

      fDb.child(`students/${id}`).remove((err) => {
        if (err) {
          alert("Unable to delete");
        } else {
          fetchDataHandler();
          alert("Deleted Successfully!");
        }
      });
    }
  };

  let content = (
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Class</th>
          <th scope="col">Roll Number</th>
          <th scope="col">View / Edit / Delete</th>
        </tr>
      </thead>
      <tbody>
        {students.map((data) => (
          <tr key={data.id}>
            <td>
              {data.firstName} {data.lastName}
            </td>
            <td>
              {data.class}-{data.division}
            </td>
            <td>{data.rollNo}</td>
            <td>
              <Link to={`/view-student/${data.id}`}>
                <img src={viewIcon} alt="View " />
              </Link>
              <Link to={`/edit-student/${data.id}`}>
                <img src={editIcon} alt="Edit" />
              </Link>
              <button
                onClick={() => deleteStudentHandler(data.id)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <img src={deleteIcon} alt="Delete " />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (students.length === 0) {
    content = <h3>No Students Found</h3>;
  }

  return (
    <div>
      <div className={addClasses.heading}>
        <p>Manage Students</p>
        <p className={addClasses.date}>{date}</p>
      </div>

      {loading && <h1>Loading...</h1>}
      {!loading && <div className={classes.body}>{content}</div>}
    </div>
  );
};

export default ManageStudent;
