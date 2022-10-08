import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <div
      className={
        color
          ? "h-[60px] px-5 items-center w-full bg-black/70 flex justify-between fixed top-0 left-0 text-white transition-all ease-in-out z-[50]"
          : "h-[60px] px-5 items-center w-full bg-black flex justify-between fixed top-0 left-0 text-white transition-all ease-in-out z-[50]"
      }
    >
      <Link to="/">
        <h1 className="text-xl">Movie App</h1>
      </Link>
      <div>
        {user ? (
          <Link to="/account">
            <button>Account</button>
          </Link>
        ) : (
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        )}

        {user ? (
          <button className="ml-10 bg-red-600 p-3" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <Link to="/signup">
            <button className="ml-10 bg-red-600 p-3">Sign Up</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
