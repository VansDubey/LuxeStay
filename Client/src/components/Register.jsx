import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

   async function handleSubmit(e){
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/register',{
                   name,
                   email,
                   password
          });
          alert("Registration complete.Now you can log in")

        } catch (error) {
          alert("Registreation failed.Please try again later")
          
        }

    } 


  return (
    <div className=" w-1/2 mx-auto p-1 mt-24 flex flex-col gap-4" >
    <h1 className="text-xl font-bold text-center underline">Register</h1>
    <form className="flex flex-col items-center gap-7 p-4 border  rounded-xl" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e)=>{setname(e.target.value)}} className="border-1 border-slate-700 rounded-lg bg-white w-full p-1"/>
        <input type="text" placeholder="Enter Your Email" value={email} onChange={(e)=>{setemail(e.target.value)}} className="border-1 border-slate-700 rounded-lg bg-white w-full p-1" />
        <input type="password" placeholder="Password"  value={password} onChange={(e)=>{setpassword(e.target.value)}}className="border-1  border-slate-700  rounded-lg bg-white w-full p-1" />
        <input type="submit"  className=" w-full  rounded-xl bg-gray-400 p-1 font-bold " />
    </form>
    <div className="flex mx-auto">
    <p>Already a member?</p><Link to='/Login' className="underline">Login!!</Link>
    </div>
</div>

  )
}

export default Register
