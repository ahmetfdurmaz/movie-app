import React, { useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { user, signUp } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    try {
      await signUp(email, password);
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black/60">
      <form className="max-w-[450px] w-[450px] h-[600px] flex items-center justify-center flex-col bg-black/75">
        <h1 className="text-3xl font-bold mb-[2rem] text-white">Sign Up</h1>
        <input
          className="mb-3 rounded p-2 bg-white/50 placeholder:text-white/90"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mb-3 rounded p-2 bg-white/50 placeholder:text-white/90"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-red-600 rounded p-2" onClick={handleSubmit}>
          Sign Up
        </button>
        <p className="mt-10 text-white/50">
          Do you have an account? Login from{" "}
          <Link className=" text-white" to="/login">
            here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
