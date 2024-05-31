import React from "react";
import "./Header.css";
import { CgProfile } from "react-icons/cg";
import { FaMessage } from "react-icons/fa6";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
function Header(){
    return(
        <div className="header">
      <a href="/profile" className="header_icon">
        <CgProfile fontSize="40px" />
      </a>
      <a href="/bookmarks" className="header_icon heart">
        <BsFillBookmarkHeartFill fontSize="40px" />
      </a>
      <a href="/messages" className="header_icon">
        <FaMessage fontSize="40px" />
      </a>
    </div>
    )
}
export default Header