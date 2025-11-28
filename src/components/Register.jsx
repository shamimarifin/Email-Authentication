import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase.init";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa6";
import { BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    const name = e.target.name.value;
    const photo = e.target.photo.value;



    console.log("Click Register", email, password, terms, name, photo);

    const passwordRegex = /^.{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters and include at least one letter and one number"
      );

      return;
    }

    // Reset States:
    setError("");
    setSuccess("");

    if(!terms){
      setError('Please agree term and condition')
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("Success Submit", result.user);
        setSuccess(true);
        e.target.reset();

        // Update user email Verification
        const profile = {
          display: name,
          photoURL: photo
        }

        updateProfile(result.user, profile)
        .then((result)=> {
          toast("Update profilie")
        }).catch((error)=> {
          toast('Profile not changed')
        })

        // Send email verification
         sendEmailVerification(result.user)
         .then(()=> {
          toast("Please verify your email address!");
         })
      })
      .catch((error) => setError(error.message));
  };

  // Password Show
  const handleToggleShowPass = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Username</label>
                <input
                  type="text"
                  className="input"
                  placeholder="username"
                  name="name"
                />
                <label className="label">Photo</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Photo Url"
                  name="photo"
                />
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                />
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input"
                    placeholder="Password"
                    name="password"
                  />
                  <button
                    className="btn btn-xs absolute top-2 right-5"
                    onClick={handleToggleShowPass}
                  >
                    {showPassword ? <FaEye /> : <BsEyeSlash />}
                  </button>
                </div>
                <div>
                  <label
                    style={{ display: "flex", gap: "6px", marginTop: "10px" }}
                  >
                    <input type="checkbox" name="terms" />I agree to the Terms &
                    Conditions
                  </label>
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
              {success && (
                <p className="text-green-400">Account create successfully</p>
              )}
              {error && <p className="text-red-400">{error}</p>}
            </form>
            <p>Already have and account <Link className="text-blue-700 underline" to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
