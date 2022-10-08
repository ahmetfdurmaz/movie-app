import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const { user, logIn } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black/60">
      <form className="max-w-[450px] w-[450px] h-[600px] flex items-center justify-center flex-col bg-black/75">
        <h1 className="text-3xl font-bold mb-[2rem] text-white">Sign In</h1>
        {error ? <p className="p-3 bg-red-400 my-3">{error}</p> : null}
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
          Sign In
        </button>
        <p className="mt-10 text-white/50">
          You are new here? Signup from{" "}
          <Link className=" text-white" to="/signup">
            here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
