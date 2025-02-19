"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

function Profile() {
  const router = useRouter()
  const handleLogOut = async()=>{
      try {
        const res = await axios.get("/api/users/logout");
        router.push("/login")
        console.log(res.data)
      } catch (error) {
         console.log(error)
      }
  }
  return (
    <div className='flex min-h-screen justify-center items-center'>
       <button className='bg-blue-800 hover:bg-blue-600 text-white p-2 rounded-md shadow-lg text-2xl font-bold' onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default Profile