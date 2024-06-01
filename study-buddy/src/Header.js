import React from "react";
import "./Header.css";
import { CgProfile } from "react-icons/cg";
import { TbSoccerField } from "react-icons/tb";
import { MdOutlineSportsSoccer } from "react-icons/md";
function Header(){
    return(
        <div className="header">
      <a href="/profile" className="header_icon burb">
        <style>
          backgroudn
        </style>
        <CgProfile fontSize="40px" />
      </a>
      <a href="/bookmarks" className="header_icon heart">
      <MdOutlineSportsSoccer fontSize="40px" />
      </a>
      <div className="righticon">
      <a href="/play" className="header_icon fly">
        <TbSoccerField fontSize="40px" />
      </a>
      </div>
    </div>
    )
}
export default Header