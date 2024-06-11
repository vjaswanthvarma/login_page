import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function SignUp(){
    var [data,setdata]=useState({username:'',email:'',password:''});
    var navigate=useNavigate();
    async function checkuser(e){
        e.preventDefault();
        var json=JSON.stringify(data);
        try{
        await axios.post("http://localhost:8000/usersignup",json).then((res)=>{ 
            console.log(res);
            if(res.data.status==="true"){
                navigate("/")
            }
            if(res.data.status==="exist"){
                alert("user already exist");
            }

        })
    }
        catch(e){
            console.log(e);
        }
    }
    return(<>
        <nav>
        <a href="#"><img src="netflixlogo.jpg" alt="logo" /></a>
    </nav>
    <div className="form-wrapper">
        <h2>Sign In</h2>
        <form onSubmit={checkuser}>
        <div className="form-control">
                <input type="text" required onChange={(e)=>{
                    setdata({username:e.target.value,email:data.email,password:data.password})
                }} />
                <label>UserName</label>
            </div>
            <div className="form-control">
                <input type="text"   onChange={(e)=>{
                    setdata({username:data.username,email:e.target.value,password:data.password})
                }} required />
                <label>Email or phone number</label>
            </div>
            <div className="form-control">
                <input type="password" required  onChange={(e)=>{
                    setdata({username:data.username,email:data.email,password:e.target.value})
                }}/>
                <label>Password</label>
            </div>
            <button type="submit">Sign Up</button>
        </form>
        <small>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. 
            <a href="#">Learn more.</a>
        </small>
    </div>
    </>)
}