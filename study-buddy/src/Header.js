import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { CgProfile } from "react-icons/cg";
import { TbSoccerField } from "react-icons/tb";
import { MdOutlineSportsSoccer } from "react-icons/md";

function Header() {
  return (
    <div className="header">
      <Link to="/profile" className="header_icon burb">
        <CgProfile fontSize="40px" />
      </Link>
      <Link to="/bookmarks" className="header_icon heart">
        <MdOutlineSportsSoccer fontSize="40px" />
      </Link>
      <div className="righticon">
        <Link to="/play" className="header_icon fly">
          <TbSoccerField fontSize="40px" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
