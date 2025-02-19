import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Signup failed! Try again.");
      }

      const data = await res.json();
      console.log("Signup successful:", data);

      // Redirect to Sign In after successful signup
      navigate("/signin");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8 md:max-w-lg">
        <h1 className="text-3xl text-center font-semibold mb-6">Sign Up</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          
          <button 
            className="bg-blue-500 text-white p-3 rounded-lg uppercase font-semibold hover:opacity-90 disabled:opacity-80 transition-all"
          >
            Sign Up
          </button>
        </form>

        <div className="flex justify-center items-center gap-2 mt-5 text-sm">
          <p>Have an account?</p>
          <Link to="/signin" className="text-blue-800 cursor-pointer hover:underline">
  Sign In
</Link>

        </div>
      </div>
    </div>
  );
}

export default SignUp;
