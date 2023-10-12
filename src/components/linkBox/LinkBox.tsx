import { NavLink } from "react-router-dom";
import { Box } from "@mui/material/";
import { ReactNode } from "react";

interface ILinkBox {
  id: string | number;
  name: string;
  linkTo: string;
  // description?: string,
  children?: ReactNode;
}

export default function LinkBox({
  id,
  name,
  linkTo,
  // description,
  children,
}: ILinkBox) {
  return (
    <NavLink
      to={`/${linkTo}/${id}`}
      style={{
        textAlign: "center",
        justifyContent: "space-evenly",
        display: "flex",
        alignItems: "center",
        border: "1px rgb(100,102,255) solid",
        borderRadius: "1rem",
        backgroundColor: "rgba(100,102,245,0.74)",
        textDecoration: "none",
        boxShadow: "0.3rem 0.3rem 0.7rem rgba(100,102,245,0.5)",
        marginInline: "auto",
      }}
    >
      <Box key={name} alignItems="center" justifyContent="center">
        <h4
          style={{
            color: "white",
            fontWeight: "300",
            fontSize: "3rem",
          }}
        >
          {name}
          {children}
        </h4>
      </Box>
    </NavLink>
  );
}
