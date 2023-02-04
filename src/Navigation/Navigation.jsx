import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";
import user from "../assets/user.png";
import logout from "../assets/logout.png";
import list from "../assets/list.png";
import { useDispatch } from "react-redux";
import { authActions } from "../Store";

const Navigation = () => {

  const dispatch = useDispatch();

  const logoutClickHandler = () =>{
    localStorage.removeItem('isLoggedIn');
    dispatch(authActions.logOut())
  }

  return (
    <div>
        <div className={classes.logo}>
            LOGO
        </div>
      <ul>
        <li>
          <NavLink
            to="/add-student"
            className={(navLink) =>
              navLink.isActive ? classes.navLinkActive : classes.navLink
            }
          >
            <img src={user} alt="user" />
            Add Student
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/manage-students"
            className={(navLink) =>
              navLink.isActive ? classes.navLinkActive : classes.navLink
            }
          >
            <img style={{color:"grey"}} src={list} alt="list" />
            Manage Students
          </NavLink>
        </li>
        <li>
          <div style={{border:"none", cursor:"pointer"}} onClick={logoutClickHandler}  className={classes.navLink} to="/">
          <img src={logout} alt="logout" />
            LOGOUT
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
