"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'


function Signup() {
  const router = useRouter()
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true)
  const handleClick = async()=>{
     setLoading(true)
    try {
        const response = await axios.post("/api/users/signup", user)
        console.log(response.data);
        toast.success("User Created Successfully!")
        router.push("/login")

    } catch (error) {
      toast.error(error?.response?.data?.error)
    }finally{
      setLoading(false)
      setUser({
        username: "",
        email: "",
        password: ""
      })
    }
  }
  useEffect(()=>{
    if(user?.username.length  === 0 || user?.email.length  ===0 || user?.password.length === 0){
      setBtnDisable(true)
    }else{
      setBtnDisable(false)
    }
  }, [user])
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
        <h1 className='text-2xl font-bold text-center mb-4'>{loading?"Processing":"SignUp"}</h1>
        <div className='bg-gray-600 p-4 rounded-lg shadow-lg w-full max-w-md '>
            <div className='mb-4'>
                <label htmlFor="username" className='mb-4 inline-block text-md font-bold'>Username</label>
                <input type="text"
                 className='w-full px-2 py-2 rounded-md focus:outline-none text-black'
                 placeholder='username'
                 value={user?.username}
                 onChange={(e)=>setUser({...user, username: e.target.value})}
                 />
            </div>
            <div className='mb-4'>
            <label htmlFor="username" className='mb-4 inline-block text-md font-bold'>Email</label>
                <input type="text"
                 className='w-full px-2 py-2 rounded-md focus:outline-none text-black'
                 placeholder='email'
                 value={user?.email}
                 onChange={(e)=>setUser({...user, email: e.target.value})}
                 />
            </div>
            <div className='mb-4'>
            <label htmlFor="username" className='mb-4 inline-block text-md font-bold'>Password</label>
                <input type="password"
                 className='w-full px-2 py-2 rounded-md focus:outline-none text-black'
                 placeholder='password'
                 value={user?.password}
                 onChange={(e)=>setUser({...user, password: e.target.value})}
                 />
            </div>
             <div className="flex justify-center">
                <button disabled={btnDisable} onClick={handleClick} className='bg-black disabled:bg-gray-300 text-white text-lg rounded-lg font-bold p-2 hover:bg-[#181818]'>Sign Up</button>
             </div>
             <Link href={"/login"}>Login here</Link>
        </div>
    </div>
  )
}

export default Signup