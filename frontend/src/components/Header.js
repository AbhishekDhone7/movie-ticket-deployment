import Avatar from "@mui/material/Avatar";
import "./header.css";
import { useContext, useState } from "react";
import { LoginContext } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  let admintoken = localStorage.getItem("adminDataToken");
  // let token = localStorage.getItem("userDataToken");

  const { loginData, setLoginData } = useContext(LoginContext);
  const name = loginData.name


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const nav = useNavigate();

  const goError = () => {
    nav("*");
  };
  const goDash = () => {
    if (admintoken) {
      nav("/admin_dash");
    } else {
      nav("/dash");
    }
  };
 

  const LogoutUser = async () => {
    let admintoken = localStorage.getItem("adminDataToken");
    let token = localStorage.getItem("userDataToken");

    if (admintoken) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/logout/${admintoken}`
        );
        let data = await res.data;
        console.log(data);
        if (res.data.status === 201) {
          console.log("User LogOut");
          localStorage.removeItem("adminDataToken");
          setLoginData("");
          nav("/");
        } else {
          console.log("error");
        }

        // console.log(loginData.ValideUserOne.email)
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/logout/${token}`
        );
        let data = await res.data;
        console.log(data);
        if (res.data.status === 201) {
          console.log("User LogOut");
          localStorage.removeItem("userDataToken");
          setLoginData("");
          nav("/");
        } else {
          console.log("error");
        }

        // console.log(loginData.ValideUserOne.email)
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <header>
        <nav>
          <h1>Book Your Show</h1>
          <h3>{name ? <>Name :- {name}</> : "" }</h3>
          <div className="avtar">
            {loginData ? (
              <Avatar
                style={{ backgroundColor: "salmon", fontWeight: "bold" }}
                onClick={handleClick}
              >
                {loginData.name[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                style={{ backgroundColor: "Blue" }}
                onClick={handleClick}
              />
            )}
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {loginData ? (
              <>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    goDash();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    nav("/tickeHistore")
                  }}
                >
                  Ticket History
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    LogoutUser();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    goError();
                  }}
                >
                  Profile
                </MenuItem>
              </>
            )}
          </Menu>
        </nav>
      </header>
    </>
  );
};

export default Header;
