import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../Firebase/firebase.init";
import { Link } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const emailRef = useRef()



  const handleLogin = e => {
    e.preventDefault()
    
    const email = e.target.email.value;
    const password = e.target.password.value

    console.log('Login Submit', email, password)
    // Reset Status
    setError('')
    setSuccess(false)

    signInWithEmailAndPassword(auth, email, password)
    .then(result=> {
      console.log(result.user)

      if(!result.user.emailVerified){
        toast("Please verify your email address!");
      }
      
    })
    .catch(error=> {
      setError(error.message)
    })

  }

  const handlePassword = ()=> {
    // console.log('Click Forget Paasword', emailRef.current.value )
    const email = emailRef.current.value ;

    sendPasswordResetEmail(auth, email)
    .then((result)=> {
      toast('Please check your email address')
    })
    .catch(()=> {
      toast('Password not reset')
    })
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold">Login now!</h1>

            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" ref={emailRef} className="input" placeholder="Email" name="email"/>
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <div onClick={handlePassword}>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
              {
                success && <p className="text-green-400">Account login success</p>
              }
              {
                error && <p className="text-red-400">Didn't match email & password</p>
              }
            </form>
              <p>New to our website? <Link className="text-blue-400 underline" to="/register">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
