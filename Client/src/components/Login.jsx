import React from 'react';
import { useState , useContext} from 'react';
import { Link,Navigate } from 'react-router-dom';
import axios from 'axios'
import { UserContext } from '../Usercontext';

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [redirect, setredirect] = useState(false)
    const {setuser}=  useContext(UserContext)
    const {user} = useContext(UserContext)

    async function handleSubmit(e){
        e.preventDefault();
        try{
           const response = await axios.post('http://localhost:3000/login',{
            email,
            password
        })
            setuser(response.data)
            alert('Login Completed')
            setredirect(true)
        }catch(e){
            alert('Login Failed')
        }       
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return (
         
        <div className=" w-1/2 mx-auto p-1 mt-24 flex flex-col gap-4 " >
            <h1 className="text-xl font-bold text-center underline">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-7 p-4 border  rounded-xl">
                <input type="text"  value={email} onChange={(e)=>{setemail(e.target.value)}} placeholder="Enter Your Email" className="border-1 border-slate-700 rounded-lg bg-white w-full p-1" />
                <input type="password" value={password} placeholder="Password" onChange={(e)=>{setpassword(e.target.value)}} className="border-1  border-slate-700  rounded-lg bg-white w-full p-1" />
                <input type="submit" className=" w-full  rounded-xl bg-gray-400 p-1 font-bold " />
            </form>
            <div className="flex mx-auto">
            <p>Don't have an account yet?</p><Link to='/register' className="underline">Register Now!!</Link>
            </div>
        </div>
       
    )
}

export default Login
