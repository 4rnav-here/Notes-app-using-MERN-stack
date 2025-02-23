import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import {validateEmail} from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Invalid email");
      return;
    }

    if(!Password){
      setError("Password is required");
      return;
    }

    setError("");

    //LOgin Api
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl mb-7">Login</h2>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput 
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="btn-primary">
              Login
            </button>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <p className="text-sm text-center mt-4">
              Not registered yet{""}
              <Link
                to="/signup"
                className="font-mediuim text-primary underline"
              >
                {" "}
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
