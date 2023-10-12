import { ReactNode } from "react";
import "./contentCard.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

interface IContentCard {
  children: ReactNode;
  headerText: string;
  linkTo: string;
  linkText: string;
}

export default function ContentCard({
  children,
  headerText,
  linkTo,
  linkText,
}: IContentCard) {
  return (
    <div className={"content-card"}>
      <div className={"content-card_header"}>
        <span className={"content-card_header-text"}>{headerText}</span>
      </div>
      <div className={"content-card_body"}>{children}</div>
      {linkTo && (
        <div className={"content-card_button"}>
          <NavLink to={linkTo}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgba(100, 102, 245, 0.74)",
              }}
            >
              {linkText}
            </Button>
          </NavLink>
        </div>
      )}
    </div>
  );
}
