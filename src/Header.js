import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "./logo.jpg";

export default function Header(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt="logo" width="50" height="50" />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            paddingLeft={1}
          >
            Task Manager
          </Typography>
          <Button onClick={props.logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
