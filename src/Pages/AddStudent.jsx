import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AddStudent.module.css";

const AddStudent = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    class: "",
    division: "",
    rollNo: "",
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    pincode: "",
  });
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    event.preventDefault();
    // console.log(event.target.name , " : ", event.target.value);
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);
    // console.log(student);

    const response = await fetch(
      "https://student-crud-6da10-default-rtdb.firebaseio.com/students.json",
      {
        method: "POST",
        body: JSON.stringify(student),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);

    setStudent({
      firstName: "",
      middleName: "",
      lastName: "",
      class: "",
      division: "",
      rollNo: "",
      address1: "",
      address2: "",
      landmark: "",
      city: "",
      pincode: "",
    });

    setLoading(false);
    navigate("/");
  };

  /** Date logic */

  useEffect(() => {
    const date = new Date();
    let str = "";
    str += date.getDate() + " / ";
    str += date.getMonth() + " / ";
    str += date.getFullYear() + " ";
    str += date.getHours() + ":";
    str += date.getMinutes();
    setDate(str);
  });

  return (
    <div>
      <div className={classes.heading}>
        <p>Add Student</p>
        <p className={classes.date}>{date}</p>
      </div>

      <div>
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
            <button className={classes.btn} type="submit">
              Loading...
            </button>
          )}

          {!loading && (
            <button className={classes.btn} type="submit">
              Add Student
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
