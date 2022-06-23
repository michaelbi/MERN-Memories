import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import memories from "../../images/memories.png";

import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("xs"));
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    if (event.target.id === "logout") {
      logout();
      setAnchorEl(null);
    }
  };

  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const user = useSelector((state) => state.auth.authData);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    if (localStorage.getItem("profile"))
      dispatch({
        type: "AUTH",
        payload: JSON.parse(localStorage.getItem("profile")),
      });
    // setUser(JSON.parse(localStorage.getItem("profile")));

    // eslint-disable-next-line
  }, []);

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    // setUser(null);
    navigate("/");
  };
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          className={classes.heading}
          component={Link}
          to="/"
          variant={small ? "h5" : "h2"}
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      {/* <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar> */}

      <Toolbar className={classes.toolbar}>
        {user ? (
          <Tooltip title="Settings">
            <IconButton
              size="small"
              onClick={handleClick}
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {
                <Avatar
                  className={classes.purple}
                  alt={user?.result?.name}
                  src={user?.result?.imageUrl}
                >
                  {user?.result?.name.charAt(0)}
                </Avatar>
              }
            </IconButton>
          </Tooltip>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem id="profile">
          {
            <Avatar
              className={classes.purple}
              alt={user?.result?.name}
              src={user?.result?.imageUrl}
            >
              {user?.result?.name.charAt(0)}
            </Avatar>
          }
          &nbsp;&nbsp;
          {user?.result?.name}
        </MenuItem>

        <Divider />

        <MenuItem id="logout">
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
