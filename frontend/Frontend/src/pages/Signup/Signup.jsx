import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate =useNavigate();

  const handleSignUp = async (e) => {
    // console.log("button clicked");
    e.preventDefault();

    if (!name) {
      setError("Name field is mandatory");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid mail id");
      return;
    }
    if (!password) {
      setError("Password is mandatory");
      return;
    }

    setError("");
      try{
        const response = await axiosInstance.post("/createAccount", {
          fullName: name,
          email: email,
          password: password
        })
        console.log(response)
    
        //Handling successfull signup
        if(response.data && response.data.error){
          setError(response.data.message)
          return 
        }
        if(response.data && response.data.accessToken){
          localStorage.setItem("token", response.data.accessToken)
          navigate('/dashboard')
        }
       }
      catch(error){
        if(error.response && error.response.data && error.data.response.message ){
          setError(error.data.response.message)
        }
        else{
          setError("An unexpected error occured. Please try again")
        }
     }
  };

  //Signup API Integration here
 



  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleSignUp}>
            <h2 className="text-2xl mb-7">Sign Up</h2>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name} // ✅ Always defined
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email} // ✅ Always defined
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password} // ✅ Always defined
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn-primary">
              Sign Up
            </button>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <p className="text-sm text-center mt-4">
              Already have an account{"? "}
              <Link to="/login" className="font-medium text-primary underline">
                {""}
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
