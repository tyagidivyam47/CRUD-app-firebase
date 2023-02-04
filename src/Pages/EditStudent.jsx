import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fireDB from "../firebase";
import classes from "./AddStudent.module.css";

const EditStudent = () => {
  const [student, setStudent] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

//   console.log("edit 10", student);

  const { id } = useParams();

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
    // console.log("edit ", loadedStudents);

    const matchedStudent = loadedStudents.find((st) => st.id === id);
    // console.log("edit 38 =>", matchedStudent);

    await setStudent(matchedStudent);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataHandler();
  }, []);

  const onSubmitHandler = (event) => {
    setLoading(true);
    event.preventDefault();
    const fDb = fireDB.database().ref();
    // console.log("57",student);
    fDb.child(`students/${id}`).set(student, (err) => {
      if (err) {
        alert("An error has occured");
      } else {
        navigate("/");
      }
    });
    setLoading(false);
  };

  const onChangeHandler = (event) => {
    event.preventDefault();
    // console.log(event.target.name , " : ", event.target.value);
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className={classes.heading}>
        <p>Edit Student</p>
      </div>

      {loading && <h1>Loading...</h1>}

      <div>
        {!loading && (
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={student.firstName}
              onChange={(event) => onChangeHandler(event)}
            />
            <input
              type="text"
              id="middleName"
              name="middleName"
              placeholder="Middle Name"
              value={student.middleName}
              onChange={(event) => onChangeHandler(event)}
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={student.lastName}
              onChange={(event) => onChangeHandler(event)}
            />
            <br />
            <select
              id="class"
              name="class"
              value={student.class}
              onChange={(event) => onChangeHandler(event)}
            >
              <option value="" disabled selected>
                Select Class
              </option>

              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
            </select>
            <select
              id="division"
              name="division"
              value={student.division}
              onChange={(event) => onChangeHandler(event)}
            >
              <option value="" disabled selected>
                Select Division
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
            <input
              type="number"
              id="rollNo"
              name="rollNo"
              placeholder="Roll Number"
              value={student.rollNo}
              onChange={(event) => onChangeHandler(event)}
            />
            <br />
            <br />
            <br />

            {/* Address */}

            <input
              type="text"
              id="address1"
              name="address1"
              placeholder="Address Line 1"
              value={student.address1}
              onChange={(event) => onChangeHandler(event)}
              style={{ width: "33.8vw" }}
            />
            <input
              type="text"
              id="address2"
              name="address2"
              placeholder="Address Line 2"
              value={student.address2}
              onChange={(event) => onChangeHandler(event)}
              style={{ width: "33.8vw" }}
            />
            <br />
            <input
              type="text"
              id="landmark"
              name="landmark"
              placeholder="Landmark"
              value={student.landmark}
              onChange={(event) => onChangeHandler(event)}
            />
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={student.city}
              onChange={(event) => onChangeHandler(event)}
            />
            <input
              type="number"
              id="pincode"
              name="pincode"
              placeholder="Pincode"
              value={student.pincode}
              onChange={(event) => onChangeHandler(event)}
            />

            <br />
            <br />

            {loading && (
              <button className={classes.btn} disabled type="submit">
                Loading...
              </button>
            )}

            {!loading && (
              <button className={classes.btn} type="submit">
                Edit Student
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default EditStudent;
