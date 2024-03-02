import ChatIcon from '@mui/icons-material/Chat';
import Search from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserInfo } from "../slices/userSlice";
import "./AppHeader.css";

function AppHeader() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    axios
      .get("/userInfo", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("edunexa_token"),
        },
      })
      .then((response) => {
        dispatch(setUserInfo(response.data.userInfo));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, isLoggedIn]);

  const handleSearch = () => {
    navigation("/search")
  }

  const handleLogout = () => {
    navigation("/logout");
  };
  return (
    <div className="login-header">
      <div className="title-container">
        <Link to="/">
          <span className="title">EduNexa</span>
        </Link>
        <span className="user-role">{userInfo.role}</span>
      </div>
      <div>
        {isLoggedIn && (
          <div>
            <Button
              style={{ marginRight: "10px" }}
              variant="text"
              color="primary"
              type="submit"
              onClick={handleSearch}
              startIcon={<Search />}>Search</Button>

            <Button
              style={{ marginRight: "10px" }}
              variant="text"
              color="primary"
              onClick={() => navigation("/chat")}
              startIcon={<ChatIcon />}>Chat</Button>
              
            <Button variant="contained" disableElevation onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppHeader;
