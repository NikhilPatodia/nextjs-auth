"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, {useState, useEffect} from 'react'
import toast from 'react-hot-toast'

function Verifyemail() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [btnDisable, setBtnDisable] = useState(true)
    const [user, setUser] = useState({
      password: "",
      cpassword: "",
      email: ""
    })
  const router = useRouter() 
   const getUserVerification = async()=>{
    try {
        const token = window.location.search.split("=")[1]
        const res = await axios.post('/api/users/verifypassword', {token});
        
        if(res.data.success){
            setIsVerified(true);
            setUser({...user, email: res?.data?.user?.email})
            toast.success(res?.data?.message);
           

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
   }, []);

     useEffect(()=>{
       if( user?.cpassword.length  ===0 || user?.password.length === 0){
         setBtnDisable(true)
       }else{
         setBtnDisable(false)
       }
       
       
     }, [user])
     const handleClick = async()=>{
        try {
            const response = await axios.post("/api/users/resetpassword", user)
            console.log(response.data);
            toast.success("Password Reset Successfully!")
            router.push("/login")
           
    
        } catch (error) {
          toast.error(error?.response?.data?.error)
        }finally{
          setUser({
            password: "",
            cpassword: "",
            email: ""
          })
        }
     }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
        {isLoading && <p>Loading....</p>}
        {isVerified && <>
        <p>User Verified Successfully.</p>
        <h1 className='text-2xl font-bold text-center mb-4'>Reset Password</h1>
        <div className='bg-gray-600 p-4 rounded-lg shadow-lg w-full max-w-md '>
        
            <div className='mb-4'>
            <label htmlFor="username" className='mb-4 inline-block text-md font-bold'>Password</label>
                <input type="password"
                 className='w-full px-2 py-2 rounded-md focus:outline-none text-black'
                 placeholder='password'
                 value={user?.password}
                 onChange={(e)=>setUser({...user, password: e.target.value})}
                 />
            </div>
            <div className='mb-4'>
            <label htmlFor="username" className='mb-4 inline-block text-md font-bold'>Confirm Password</label>
                <input type="password"
                 className='w-full px-2 py-2 rounded-md focus:outline-none text-black'
                 placeholder='Confirm Password'
                 value={user?.cpassword}
                 onChange={(e)=>setUser({...user, cpassword: e.target.value})}
                 />
            </div>
            
             <div className="flex justify-center">
                <button disabled={btnDisable} onClick={handleClick} className='disabled:bg-gray-300 bg-black text-white text-lg rounded-lg font-bold p-2 hover:bg-[#181818]'>Reset Password</button>
             </div>
             
        </div>
        </>
}
    
    </div>
  )
}

export default Verifyemail