import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewStudent = () => {
  const [student, setStudent] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const fetchDataHandler = async () => {
    const response = await fetch(
      "https://student-crud-6da10-default-rtdb.firebaseio.com/students.json"
    );
    const Data = await response.json();
    const data = Data[id];
    console.log(data);
    setStudent(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataHandler();
  }, []);

  let content = "";

  if (!loading) {
    content = (
      <ul>
        <li>First Name : {student.firstName}</li>
        <li>
          Middle Name : {student.middleName ? student.middleName : "null"}
        </li>
        <li>Last Name : {student.lastName ? student.lastName : "null"}</li>
        <li>Class : {student.class ? student.class : "null"}</li>
        <li>Division : {student.division ? student.division : "null"}</li>
          <li>Roll Number : {student.rollNo}</li>
          <li>Address Line 1 : {student.address1 ? student.address1 : "null"}</li>
          <li>Address Line 2 : {student.address2 ? student.address1 : "null"}</li>
          <li>Landmark : {student.landmark ? student.landmark : "null"}</li>
          <li>City : {student.city ? student.city : "null"}</li>
          <li>Pin Code : {student.pincode ? student.pincode : "null"}</li>
      </ul>
    );
  }

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {!loading && content}
    </div>
  );
};

export default ViewStudent;
