import { Alert, Button, FloatingLabel, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  
// to get the form data from the label tag and set the data using setFormData() in to the fromData property
const handelChange = (event) => {
//  set input field data to the formData propert.
    setFormData({...formData, [event.target.id]: event.target.value.trim() })
  }

// Using the hendelSumbit method to send the form data to the server
const handelSubmit = async(event) => {
  event.preventDefault();
  if ( !formData.email || !formData.password ) {
    return setErrorMessage('Please fill out all requried files.')
  }
  try {
    setLoading(true);
    setErrorMessage(null);
    const res = await fetch('/api/auth/signin',{
      method : 'POST',
      headers:{'content-type': 'application/json' },
      body:JSON.stringify(formData), 
    })
    const data = await res.json();
    if (data.success == false) {
      setLoading(false)
      return setErrorMessage('Invalid email or password ');
    }
    setLoading(false);
    if (res.ok) {
      navigate('/');
    }ē
  } catch (error) {
    setErrorMessage(error.message);
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 ">
        {/* left side div  */}
        <div className="flex-1">
          <Link to="/" className=" font-bold text-4xl  dark:text-white">
            <samp className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white ">
              Tech'S
            </samp>
            blog's
          </Link>
          <p className="text-sm mt-5">
          You can signup with your email and password or With Google.
          </p>
        </div>

        {/* right side div  */}
        <div className="flex-1">
          {
            errorMessage && (
              <Alert className="mt-5 " color='failure' >
                {errorMessage}
              </Alert>
            )
          }
          <form className="flex flex-col gap-4" onSubmit={handelSubmit} >
            {/* <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="UserName" required id="username" onChange={handelChange}/>
            </div> */}
            <div>
              <Label value="Your Email" />
              <TextInput type="email" placeholder="user@gmail.com" required id="email" onChange={handelChange}/>
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="password" placeholder="********" required id="password" onChange={handelChange}/>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading} >
              {
                loading ? (
                  <>
                  <Spinner size='sm' />
                  <span className="pl-3" >loading... </span>
                  </>
                ): 'Sign In'
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span> Don't Have an account?</span>
            <Link to="/sign-up" className="text-blue-500"  >
              Sign Up
            </Link>
          </div>
          {/*
          {
            errorMessage && (
              <Alert className="mt-5 " color='failure' >
                {errorMessage}
              </Alert>
            )
          }
          */}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
