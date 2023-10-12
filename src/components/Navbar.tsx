import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static" style={{ backgroundColor: "#303035" }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <NavLink
              to={"/"}
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
            >
              QUIZ
            </NavLink>
          </Typography>
          <div
            className={"actions"}
            style={{ position: "absolute", right: "1rem" }}
          >
            {/*<Button color="inherit" onClick={printToken}>Get Token</Button>*/}
            <p
              style={{
                display: "inline-flex",
                color: "inherit",
                alignItems: "center",
              }}
            >
              <NavLink
                to={"/quiz/create"}
                style={{
                  color: "inherit",
                  textDecoration: "inherit",
                }}
              >
                <Button
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                >
                  ADD QUIZ
                </Button>
              </NavLink>
              {/* <Button
                style={{
                  color: "inherit",
                  textDecoration: "inherit",
                }}
                onClick={
                  () => clearLocalStorage() //TODO change to normal logout
                }
              >
                (Logout)
              </Button> */}
            </p>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
