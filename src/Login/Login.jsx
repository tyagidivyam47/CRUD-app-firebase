import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../Store";
import Card from "../UI/Card";
import classes from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const storedLoginInfo = localStorage.getItem("isLoggedIn");
    if (storedLoginInfo === "1") {
      dispatch(authActions.logIn());
    }
  });

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setPassword("");
    setUsername("");
    if (username !== "test1@gmail.com" || password !== "1234") {
      setError(true);
      return;
    }
    // alert("Log In Successful");
    setError(false);
    localStorage.setItem("isLoggedIn", "1");
    dispatch(authActions.logIn());
  };
  return (
    <div className={classes.login}>
      <h1 style={{marginLeft:"50px"}}>LOGIN</h1>

      <Card className={classes.login}>
        <form onSubmit={onSubmitHandler}>
          <div className={classes.inp}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="email"
              //   value={username}
              onChange={usernameChangeHandler}
            />
          </div>
          <div className={classes.inp}>
            <label htmlFor="pass">Password</label>
            <input
              id="pass"
              type="password"
              //   value={password}
              onChange={passwordChangeHandler}
            />
          </div>
          <div className={classes["error-msg"]}>
            {error && <p>Username or Password is incorrect</p>}
          </div>

          <button type="submit">Log In</button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
