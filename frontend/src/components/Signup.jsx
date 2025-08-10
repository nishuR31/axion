import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '..';


const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    gender: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Error signing you up.");
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }
  return (
    <div className="mx-auto min-w-96">
      <div className='w-full p-6 bg-transparent border border-gray-100 rounded-lg shadow-md bg-clip-padding backdrop-blur-sm bg-opacity-10'>
        <h1 className='text-3xl font-bold text-center text-gray-400 animate-bounce hover:underline'>Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className='p-2 label'>
              <span className='text-base text-gray-300 label-text'>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='w-full h-10 p-2 border-none rounded-md outline-none bg-black/50'
              type="text"
              placeholder='Full Name' />
          </div>
          <div>
            <label className='p-2 label'>
              <span className='text-base text-gray-300 label-text'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full h-10 p-2 border-none rounded-md outline-none bg-black/50'
              type="text"
              placeholder='Username' />
          </div>
          <div>
            <label className='p-2 label'>
              <span className='text-base text-gray-700 label-text'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full h-10 p-2 border-none rounded-md outline-none bg-black/50'
              type="password"
              placeholder='Password' />
          </div>
          <div>
            <label className='p-2 label'>
              <span className='text-base text-gray-300 label-text'>Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full h-10 p-2 border-none rounded-md outline-none bg-black/50'
              type="password"
              placeholder='Confirm Password' />
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p className='font-bold text-gray-900 '>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="mx-2 hover:border-black checkbox" />
            </div>
            <div className='flex items-center'>
              <p className='font-bold text-gray-900 '>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="mx-2 hover:border-black checkbox" />
            </div>
          </div>
          <p className='my-2 text-center text-gray-800'>Already have an account? <Link to="/login" className='font-bold hover:underline'> login </Link></p>
          <div>
            <button type='submit' className='mt-2 border btn btn-block btn-sm border-slate-300'>Signup</button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default Signup
