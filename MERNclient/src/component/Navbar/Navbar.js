import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import memories from "../../images/memories.png";

import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          variant="h2"
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
      <Toolbar className={classes.toolbar}>
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
