"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, {useState, useEffect} from 'react'
import toast from 'react-hot-toast'

function Verifyemail() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter() 
   const getUserVerification = async()=>{
    try {
        const token = window.location.search.split("=")[1]
        const res = await axios.post('/api/users/verifyemail', {token})
        if(res.data.success){
            setIsVerified(true)
            toast.success(res?.data?.message);
            router.push("/login")

        }else{
            setIsVerified(false)
        }
    } catch (error) {
        console.log(error);
        
        setIsVerified(false)
    }finally{
        setIsLoading(false)
    }
   } 
   useEffect(()=>{
      getUserVerification()
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
  return (
    <div>
        {isLoading && <p>Loading....</p>}
        {isVerified && <p>User Verified Successfully.</p>}
    </div>
  )
}

export default Verifyemail